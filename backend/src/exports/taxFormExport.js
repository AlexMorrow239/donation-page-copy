/*
  Exporter functions which export into output directory exportFiles
  NOTE: These functions are not well tested or well written, we ran out of time
  TO IMPLEMENT: failsafe so if any part of the saving process fails it reverts to old version & doesn't save any changes nor updates the last export timestamp
  BUGS: The dailyTaxFormExport file is corrupted when generated. This may have to do with new lines or the tools we're using
  TO TEST: still needs rigorous testing, espeically on deployment
*/
const XLSX = require('xlsx');
var Excel = require('exceljs');
const fs = require('fs');
const path = require('path');


const User = require('../models/userModel');
const Payment = require('../models/paymentModel');
const ExportTimestamp = require('../models/exportTimestamp'); // Import the timestamp model

// Directory to save Excel files
const outputDir = path.join(__dirname, 'exportFiles');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
fs.mkdirSync(outputDir);
}

//exports all data from the given year into a new excel sheet
async function exportToExcelByYear(yearOfData) {
  try {
    const startDate = new Date(yearOfData, 0, 1); // January 1st of the current year
    const endDate = new Date(yearOfData, 11, 31, 23, 59, 59); // December 31st of the current year

    // Fetch users and populate with payments created within the past year
    const users = await User.find({
        createdAt: { $gte: startDate, $lte: endDate } // Filter by documents created within the current calendar year
      }).populate('paymentIds').exec();

    // Convert MongoDB data to a format suitable for Excel
    const formattedData = users.map(user => { //This is where we specify what is to be exported!
      return {
        FirstName: user.firstName,
        LastName: user.lastName,
        Email: user.email,
        Address: user.address,
        Country: user.country,
        State: user.state,
        PhoneNumber: user.phoneNumber,
        ZipCode: user.zipCode,
        TotalPaid: user.totalPaid,
        Payments: user.paymentIds.map(payment => ({
          Amount: payment.amount,
          Method: payment.method,
          Message: payment.message
        })).map(payment => JSON.stringify(payment)).join(', ')
      };
    });

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    // Create a file name with a timestamp
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const fileName = `taxFormData_${timestamp}.xlsx`;
    const filePath = path.join(outputDir, fileName);

    // Write the workbook to a file
    XLSX.writeFile(workbook, filePath);

    console.log(`Exported data to ${filePath}`);
  } catch (err) {
    console.error('Error exporting data:', err);
  }
}

//Exports all new data since the last export using helper function appendPaymentToExcel
async function exportToExcelNewData() {
    try {
      
      const timestampDoc = await ExportTimestamp.findOne(); //retrieve the last timestamp of
      const lastExport = timestampDoc ? timestampDoc.lastExport : new Date(0); // Default to Unix epoch if no record
  
      // Fetch users and populate with payments created within the past year
      const users = await User.find({
        createdAt: { $gte: lastExport } // Filter by documents created since the last export
        }).exec();

      const payments = await Payment.find({
        createdAt: { $gte: lastExport } // Filter by documents created since the last export
        }).populate('userId').exec();
  
      if (users.length > 0 || payments.length > 0) {
        // Convert MongoDB data to a format suitable for Excel
        const formattedData = users.map(user => { //This is where we specify what is to be exported!
          return {
            FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            Address: user.address,
            Country: user.country,
            State: user.state,
            PhoneNumber: user.phoneNumber,
            ZipCode: user.zipCode,
            TotalPaid: user.totalPaid,
          };
        });

        const headers = [
          'FirstName',
          'LastName',
          'Email',
          'Address',
          'Country',
          'State',
          'PhoneNumber',
          'ZipCode',
          'TotalPaid',
          'Payments'
        ];

        // Ensure the export directory exists
      const exportDir = path.join(__dirname, 'exportFiles');
      if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
      }

      const filePath = path.join(exportDir, 'dailyTaxFormExport.xlsx');

      // Check if the file already exists
      let workbook;
      if (fs.existsSync(filePath)) {
        // Read the existing workbook
        workbook = XLSX.readFile(filePath);
        console.log('Workbook loaded for appending.');
      } else {
        // Create a new workbook if the file doesn't exist
        workbook = XLSX.utils.book_new();
        console.log('New workbook created.');
      }

      // Access the first worksheet or create one if it doesn't exist
      let worksheet = workbook.Sheets['Users'];
      if (!worksheet) {
        worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
        XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
      }

      // Convert worksheet to JSON to find the last row
      const wsData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Find the first empty row
      const startRow = wsData.length ? wsData.length + 1 : 1;

      // Append rows to the worksheet
      formattedData.forEach((data, index) => {
        const row = [
          data.FirstName,
          data.LastName,
          data.Email,
          data.Address,
          data.Country,
          data.State,
          data.PhoneNumber,
          data.ZipCode,
          data.TotalPaid,
          data.Payments
        ];
        XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: startRow + index });
      });

      XLSX.writeFile(workbook, filePath);
      workbook = XLSX.readFile(filePath);

      //Now appends all new payments

      for (i = 0; i < payments.length; i++){
        appendPaymentToExcel(payments[i]);
      }

      //Should implement some type of failsafe here so we don't update timestamp if the export failed
      //Should also reset the file so all changes are reverted when one thing failes
        
      // Update the last export timestamp
      if (timestampDoc) {
          timestampDoc.lastExport = new Date();
          await timestampDoc.save();
      } else {
          await ExportTimestamp.create({ lastExport: new Date() });
      }
      
      console.log("export completed")
      return;

    } else {
        console.log('No new items to export.');
    }
    } catch (err) {
      console.error('Error exporting data:', err);
    }
  }



  async function appendPaymentToExcel(newPayment) {
    try {
      // Fetch user based on the payment (assuming you have the user's email)
      const userEmail = newPayment.userId.email; // Example email, should be part of the payment data
      // Ensure the export directory exists
      const exportDir = path.join(__dirname, 'exportFiles');
      if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
      }
  
      const filePath = path.join(exportDir, 'dailyTaxFormExport.xlsx');
  
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        console.error('File does not exist. Cannot append payment.');
        return;
      }
  
      // Load the existing workbook
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets['Users'];
  
      if (!worksheet) {
        console.error('Worksheet "Users" does not exist.');
        return;
      }
  
      // Convert worksheet to JSON array to manipulate rows
      const worksheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = worksheetData[0]; // Assuming first row is headers
      const emailIndex = headers.indexOf('Email');
      const paymentsIndex = headers.indexOf('Payments');

  
      if (emailIndex === -1 || paymentsIndex === -1) {
        console.error('Email or Payments column not found.');
        return;
      }
      
      // Find the user row by email
      let userRowIndex = -1;
      for (let i = 1; i < worksheetData.length; i++) { // Skip headers
        console.log("comparing (sheet) ",worksheetData[i][emailIndex], " with ",userEmail)
        if (worksheetData[i][emailIndex] == userEmail) {
          console.log("found!")
          userRowIndex = i + 1; // Adjust index for worksheet (1-based index)
          break;
        }
      }
  
      if (userRowIndex === -1) {
        console.error('User with email not found.');
        return;
      }
  
      //modify the workbook - used exceljs here so should potentially modify everything to use one tool - maybe why corruption is occuring?
      let workbook1 = new Excel.Workbook();
      await workbook1.xlsx.readFile(filePath);
      let worksheetHelper = workbook1.getWorksheet("Users");
      let row = worksheetHelper.getRow(userRowIndex);
      const currentPayments = row.getCell(10).value;
  
      // Parse and update payments
      let paymentsArray;
      if (currentPayments) {
        paymentsArray = JSON.parse(`[${currentPayments}]`); // JSON array from string
      } else {
        paymentsArray = [];
      }
  
      // Append new payment
      paymentsArray.push({
        Amount: newPayment.amount,
        Method: newPayment.method,
        Message: newPayment.message
      });
  
      // Update the payments cell
      const newPaymentsString = paymentsArray.map(payment => JSON.stringify(payment)).join(', ');

      row.getCell(10).value = newPaymentsString;
      workbook1.xlsx.writeFile(filePath);

      console.log(`Payment data appended for user ${userEmail}. At file path ${filePath}`);
      return;
    } catch (err) {
      console.error('Error appending payment data:', err);
    }
  }
  



module.exports = {exportToExcelByYear, exportToExcelNewData};