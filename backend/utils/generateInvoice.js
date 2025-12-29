import PDFDocument from "pdfkit";

export const generateInvoice = (order, user) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // header
    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice No: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.moveDown();

    // CUSTOMER
    doc.text(`Billed To:`);
    doc.text(user.name);
    doc.text(user.email);
    doc.moveDown();

    // ITEMS
    doc.text("Order Details:", { underline: true });
    doc.moveDown(0.5);

    order.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - ₹${item.price} × ${item.quantity}`
      );
    });

    doc.moveDown();

    //  TOTAL
    doc.fontSize(14).text(`Total Amount: ${order.amount} INR`, {
      align: "right"
    });

    doc.moveDown(2);

    // FOOTER
    doc.fontSize(10).text(
      "Thank you for shopping with us!",
      { align: "center" }
    );

    doc.end();
  });
};
