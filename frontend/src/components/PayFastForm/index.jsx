import React from "react";

export default function PayFastPayNowForm() {
  return (
    <form
      name="PayFastPayNowForm"
      action="https://payment.payfast.io/eng/process"
      method="post"
    >
      <input required type="hidden" name="cmd" value="_paynow" />
      <input
        required
        type="hidden"
        name="receiver"
        pattern="[0-9]"
        value="24730296"
      />
      <table>
        <tbody>
          <tr>
            <td>
              <label id="PayFastAmountLabel" htmlFor="PayFastAmount">
                Amount:{" "}
              </label>
            </td>
            <td>
              <input
                required
                id="PayFastAmount"
                type="number"
                step=".01"
                name="amount"
                min="5.00"
                placeholder="5.00"
                defaultValue="5"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <input
        required
        type="hidden"
        name="item_name"
        maxLength="255"
        value="Donation-btn"
      />
      <table>
        <tbody>
          <tr>
            <td colSpan="2" align="center">
              <input
                type="image"
                src="https://my.payfast.io/images/buttons/DonateNow/Dark-Large-DonateNow.png"
                alt="Donate Now"
                title="Donate Now with Payfast"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
