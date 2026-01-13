fetch("data/ecommerce_events.csv")
  .then(res => res.text())
  .then(data => {
    const rows = data.split("\n").slice(1);

    let funnel = {
      view: 0,
      add_to_cart: 0,
      purchase: 0
    };

    let devicePurchases = { mobile: 0, desktop: 0 };
    let variantPurchases = { A: 0, B: 0 };

    rows.forEach(r => {
      const [, event, , , , device, , variant] = r.split(",");

      if (funnel[event] !== undefined) funnel[event]++;
      if (event === "purchase") {
        devicePurchases[device]++;
        variantPurchases[variant]++;
      }
    });

    // Funnel Chart
    new Chart(document.getElementById("funnelChart"), {
      type: "bar",
      data: {
        labels: ["Product Views", "Add to Cart", "Purchases"],
        datasets: [{
          label: "Users",
          data: [funnel.view, funnel.add_to_cart, funnel.purchase]
        }]
      }
    });

    // Drop-off Rates
    const cartDrop = (((funnel.view - funnel.add_to_cart) / funnel.view) * 100).toFixed(1);
    const checkoutDrop = (((funnel.add_to_cart - funnel.purchase) / funnel.add_to_cart) * 100).toFixed(1);

    document.getElementById("dropoff").innerHTML = `
      <p><strong>Product → Cart Drop-off:</strong> ${cartDrop}%</p>
      <p><strong>Cart → Purchase Drop-off:</strong> ${checkoutDrop}%</p>
    `;

    // Device Chart
    new Chart(document.getElementById("deviceChart"), {
      type: "pie",
      data: {
        labels: ["Mobile", "Desktop"],
        datasets: [{
          data: [devicePurchases.mobile, devicePurchases.desktop]
        }]
      }
    });

    // A/B Test
    document.getElementById("abTest").innerHTML = `
      <p>Variant A Purchases: ${variantPurchases.A}</p>
      <p>Variant B Purchases: ${variantPurchases.B}</p>
      <p><strong>Winning Variant:</strong> ${variantPurchases.B > variantPurchases.A ? "B" : "A"}</p>
    `;
  });
