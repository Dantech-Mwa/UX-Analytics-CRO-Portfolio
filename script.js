/****************************************************
 UX ANALYTICS & CRO DASHBOARD
 Author: Mwanza Wambua
 Description:
 - GA4-style event analysis
 - Funnel tracking
 - Drop-off diagnostics
 - A/B testing evaluation
 - Cohort-style retention logic
****************************************************/

fetch("data/ecommerce_events.csv")
  .then(response => response.text())
  .then(csvData => {
    const rows = csvData.split("\n").slice(1);

    const events = [];
    rows.forEach(row => {
      if (row.trim() !== "") {
        const [
          user_id,
          event_type,
          step,
          device,
          traffic,
          variant,
          price
        ] = row.split(",");

        events.push({
          user_id,
          event_type,
          step,
          device,
          traffic,
          variant,
          price: Number(price)
        });
      }
    });

    // ===============================
    // FUNNEL CALCULATION
    // ===============================
    const funnelSteps = ["product", "cart", "address", "payment", "confirmation"];
    const funnelCounts = {};

    funnelSteps.forEach(step => {
      funnelCounts[step] = new Set();
    });

    events.forEach(event => {
      if (funnelCounts[event.step]) {
        funnelCounts[event.step].add(event.user_id);
      }
    });

    const funnelData = funnelSteps.map(step => funnelCounts[step].size);

    // ===============================
    // DROPOFF ANALYSIS
    // ===============================
    function calculateDropoff(previous, current) {
      if (previous === 0) return 0;
      return (((previous - current) / previous) * 100).toFixed(2);
    }

    const dropoffs = {
      product_to_cart: calculateDropoff(funnelData[0], funnelData[1]),
      cart_to_address: calculateDropoff(funnelData[1], funnelData[2]),
      address_to_payment: calculateDropoff(funnelData[2], funnelData[3]),
      payment_to_confirmation: calculateDropoff(funnelData[3], funnelData[4])
    };

    // ===============================
    // REVENUE METRICS
    // ===============================
    let totalRevenue = 0;
    let totalPurchases = 0;

    events.forEach(event => {
      if (event.event_type === "purchase") {
        totalRevenue += event.price;
        totalPurchases++;
      }
    });

    // ===============================
    // A/B TESTING ANALYSIS
    // ===============================
    const variantStats = {
      A: { users: new Set(), purchases: 0, revenue: 0 },
      B: { users: new Set(), purchases: 0, revenue: 0 }
    };

    events.forEach(event => {
      variantStats[event.variant].users.add(event.user_id);

      if (event.event_type === "purchase") {
        variantStats[event.variant].purchases++;
        variantStats[event.variant].revenue += event.price;
      }
    });

    // ===============================
    // COHORT RETENTION LOGIC
    // ===============================
    const userPurchaseCount = {};

    events.forEach(event => {
      if (event.event_type === "purchase") {
        userPurchaseCount[event.user_id] =
          (userPurchaseCount[event.user_id] || 0) + 1;
      }
    });

    const returningUsers = Object.values(userPurchaseCount).filter(
      count => count > 1
    ).length;

    const retentionRate = (
      (returningUsers / Object.keys(userPurchaseCount).length) *
      100
    ).toFixed(2);

    // ===============================
    // RENDER DASHBOARD
    // ===============================
    document.getElementById("dropoff").innerHTML = `
      <p><strong>Product → Cart Drop-off:</strong> ${dropoffs.product_to_cart}%</p>
      <p><strong>Cart → Address Drop-off:</strong> ${dropoffs.cart_to_address}%</p>
      <p><strong>Address → Payment Drop-off:</strong> ${dropoffs.address_to_payment}%</p>
      <p><strong>Payment → Confirmation Drop-off:</strong> ${dropoffs.payment_to_confirmation}%</p>
      <p><strong>Total Revenue:</strong> $${totalRevenue}</p>
      <p><strong>Retention Rate:</strong> ${retentionRate}%</p>
    `;

    document.getElementById("abtest").innerHTML = `
      <p>Variant A: ${variantStats.A.purchases} purchases ($${variantStats.A.revenue})</p>
      <p>Variant B: ${variantStats.B.purchases} purchases ($${variantStats.B.revenue})</p>
      <p><strong>Winning Variant:</strong> ${
        variantStats.B.revenue > variantStats.A.revenue ? "B" : "A"
      }</p>
    `;
  });
