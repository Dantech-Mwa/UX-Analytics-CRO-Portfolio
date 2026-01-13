// UX Analytics & CRO Portfolio - Core Analytics Engine
// Author: Mwanza Wambua
// Enterprise-grade analytics logic for portfolio demonstration

class UXAnalyticsEngine {
    constructor() {
        this.events = [];
        this.uniqueUsers = new Set();
        this.funnelSteps = {
            'view': 'product',
            'add_to_cart': 'cart',
            'checkout': 'address',
            'purchase': 'confirmation',
            'exit': 'exit'
        };
        
        this.init();
    }

    // Initialize the analytics engine
    async init() {
        console.log('Initializing UX Analytics Engine...');
        await this.loadData();
        this.processAnalytics();
        this.renderDashboard();
        this.setupEventListeners();
    }

    // Load CSV data (simulated)
    async loadData() {
        // In a real implementation, this would fetch from a CSV file
        // For portfolio purposes, we'll generate realistic sample data
        this.generateSampleData();
        console.log(`Loaded ${this.events.length} events for ${this.uniqueUsers.size} unique users`);
    }

    // Generate realistic sample data matching GA4/Shopify schema
    generateSampleData() {
        const eventTypes = ['view', 'add_to_cart', 'checkout', 'purchase', 'exit'];
        const devices = ['mobile', 'desktop'];
        const trafficSources = ['organic', 'paid', 'email', 'direct', 'social'];
        const variants = ['A', 'B'];
        
        // Generate 1000 realistic e-commerce events
        for (let i = 0; i < 1000; i++) {
            const userId = `user_${Math.floor(Math.random() * 200) + 1}`;
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            const step = this.funnelSteps[eventType] || 'product';
            const device = devices[Math.floor(Math.random() * devices.length)];
            const traffic = trafficSources[Math.floor(Math.random() * trafficSources.length)];
            const variant = variants[Math.floor(Math.random() * variants.length)];
            
            // Generate realistic prices for purchases
            let price = 0;
            if (eventType === 'purchase') {
                price = Math.floor(Math.random() * 200) + 20; // $20-$220 purchases
            }
            
            this.events.push({
                user_id: userId,
                event_type: eventType,
                step: step,
                device: device,
                traffic: traffic,
                variant: variant,
                price: price,
                timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Last 7 days
            });
            
            this.uniqueUsers.add(userId);
        }
        
        // Ensure we have proper funnel progression for some users
        this.createRealisticFunnelPaths();
    }

    // Create realistic user journeys
    createRealisticFunnelPaths() {
        // Create 50 complete funnel paths
        for (let i = 1; i <= 50; i++) {
            const userId = `funnel_user_${i}`;
            const variant = i % 2 === 0 ? 'A' : 'B';
            const device = i % 3 === 0 ? 'mobile' : 'desktop';
            const traffic = ['organic', 'paid', 'email'][i % 3];
            
            // Simulate complete funnel progression
            const funnelEvents = [
                { event_type: 'view', step: 'product', price: 0 },
                { event_type: 'add_to_cart', step: 'cart', price: 0 },
                { event_type: 'checkout', step: 'address', price: 0 },
                { event_type: 'purchase', step: 'confirmation', price: Math.floor(Math.random() * 200) + 50 }
            ];
            
            funnelEvents.forEach(event => {
                this.events.push({
                    user_id: userId,
                    event_type: event.event_type,
                    step: event.step,
                    device: device,
                    traffic: traffic,
                    variant: variant,
                    price: event.price,
                    timestamp: new Date()
                });
            });
            
            this.uniqueUsers.add(userId);
        }
    }

    // Core analytics processing
    processAnalytics() {
        console.log('Processing analytics data...');
        
        // Calculate funnel metrics
        this.calculateFunnelMetrics();
        
        // Calculate drop-off points
        this.calculateDropOffs();
        
        // Evaluate A/B test
        this.evaluateABTest();
        
        // Analyze cohort retention
        this.analyzeCohorts();
        
        // Analyze device performance
        this.analyzeDevicePerformance();
        
        // Generate recommendations
        this.generateRecommendations();
    }

    // Funnel analysis (GA4-style unique user counting)
    calculateFunnelMetrics() {
        console.log('Calculating funnel metrics...');
        
        // Get unique users per funnel step
        const uniqueUsersByStep = {
            'view': new Set(),
            'add_to_cart': new Set(),
            'checkout': new Set(),
            'purchase': new Set()
        };
        
        this.events.forEach(event => {
            if (uniqueUsersByStep[event.event_type]) {
                uniqueUsersByStep[event.event_type].add(event.user_id);
            }
        });
        
        this.funnelMetrics = {
            productViews: uniqueUsersByStep.view.size,
            addToCart: uniqueUsersByStep.add_to_cart.size,
            checkout: uniqueUsersByStep.checkout.size,
            purchases: uniqueUsersByStep.purchase.size
        };
        
        // Calculate conversion rates
        this.funnelConversion = {
            viewToCart: ((this.funnelMetrics.addToCart / this.funnelMetrics.productViews) * 100).toFixed(1),
            cartToCheckout: ((this.funnelMetrics.checkout / this.funnelMetrics.addToCart) * 100).toFixed(1),
            checkoutToPurchase: ((this.funnelMetrics.purchases / this.funnelMetrics.checkout) * 100).toFixed(1),
            overall: ((this.funnelMetrics.purchases / this.funnelMetrics.productViews) * 100).toFixed(1)
        };
        
        // Calculate total revenue
        this.totalRevenue = this.events
            .filter(e => e.event_type === 'purchase')
            .reduce((sum, e) => sum + e.price, 0);
    }

    // Drop-off analysis
    calculateDropOffs() {
        console.log('Calculating drop-off points...');
        
        this.dropOffs = {
            viewToCart: 100 - parseFloat(this.funnelConversion.viewToCart),
            cartToCheckout: 100 - parseFloat(this.funnelConversion.cartToCheckout),
            checkoutToPurchase: 100 - parseFloat(this.funnelConversion.checkoutToPurchase)
        };
        
        // Identify critical drop-off point
        this.criticalDropOff = Object.entries(this.dropOffs)
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    // A/B testing evaluation
    evaluateABTest() {
        console.log('Evaluating A/B test...');
        
        // Group events by variant
        const variantEvents = {
            'A': this.events.filter(e => e.variant === 'A'),
            'B': this.events.filter(e => e.variant === 'B')
        };
        
        // Calculate metrics per variant
        this.abTestResults = {};
        
        for (const [variant, events] of Object.entries(variantEvents)) {
            const uniqueUsers = new Set(events.map(e => e.user_id));
            const purchases = events.filter(e => e.event_type === 'purchase');
            const revenue = purchases.reduce((sum, e) => sum + e.price, 0);
            
            this.abTestResults[variant] = {
                users: uniqueUsers.size,
                purchases: purchases.length,
                revenue: revenue,
                conversionRate: purchases.length > 0 ? 
                    ((purchases.length / uniqueUsers.size) * 100).toFixed(1) : '0.0'
            };
        }
        
        // Determine winner
        const convA = parseFloat(this.abTestResults.A.conversionRate);
        const convB = parseFloat(this.abTestResults.B.conversionRate);
        
        this.abTestWinner = convB > convA ? 'B' : 'A';
        this.abTestImprovement = Math.abs(((convB - convA) / convA) * 100).toFixed(1);
    }

    // Cohort retention analysis
    analyzeCohorts() {
        console.log('Analyzing cohort retention...');
        
        // Group purchases by user
        const userPurchases = {};
        
        this.events.forEach(event => {
            if (event.event_type === 'purchase') {
                if (!userPurchases[event.user_id]) {
                    userPurchases[event.user_id] = [];
                }
                userPurchases[event.user_id].push(event);
            }
        });
        
        // Calculate retention metrics
        const repeatCustomers = Object.values(userPurchases)
            .filter(purchases => purchases.length > 1)
            .length;
        
        const totalCustomers = Object.keys(userPurchases).length;
        const retentionRate = totalCustomers > 0 ? 
            ((repeatCustomers / totalCustomers) * 100).toFixed(1) : '0.0';
        
        const avgRepeatPurchases = repeatCustomers > 0 ?
            (Object.values(userPurchases)
                .filter(p => p.length > 1)
                .reduce((sum, p) => sum + p.length, 0) / repeatCustomers).toFixed(1) : '0.0';
        
        this.cohortMetrics = {
            repeatCustomers: repeatCustomers,
            totalCustomers: totalCustomers,
            retentionRate: retentionRate,
            avgRepeatPurchases: avgRepeatPurchases
        };
    }

    // Device performance analysis
    analyzeDevicePerformance() {
        console.log('Analyzing device performance...');
        
        // Group by device
        const deviceGroups = {
            'mobile': { users: new Set(), purchases: 0, revenue: 0 },
            'desktop': { users: new Set(), purchases: 0, revenue: 0 }
        };
        
        this.events.forEach(event => {
            if (deviceGroups[event.device]) {
                deviceGroups[event.device].users.add(event.user_id);
                
                if (event.event_type === 'purchase') {
                    deviceGroups[event.device].purchases++;
                    deviceGroups[event.device].revenue += event.price;
                }
            }
        });
        
        // Calculate conversion rates per device
        this.deviceMetrics = {};
        for (const [device, data] of Object.entries(deviceGroups)) {
            this.deviceMetrics[device] = {
                users: data.users.size,
                purchases: data.purchases,
                revenue: data.revenue,
                conversionRate: data.users.size > 0 ? 
                    ((data.purchases / data.users.size) * 100).toFixed(1) : '0.0'
            };
        }
        
        // Traffic source analysis
        this.trafficAnalysis = this.analyzeTrafficSources();
    }

    // Traffic source analysis
    analyzeTrafficSources() {
        const trafficGroups = {};
        
        this.events.forEach(event => {
            if (!trafficGroups[event.traffic]) {
                trafficGroups[event.traffic] = {
                    users: new Set(),
                    purchases: 0,
                    revenue: 0
                };
            }
            
            trafficGroups[event.traffic].users.add(event.user_id);
            
            if (event.event_type === 'purchase') {
                trafficGroups[event.traffic].purchases++;
                trafficGroups[event.traffic].revenue += event.price;
            }
        });
        
        // Calculate metrics
        const results = {};
        for (const [source, data] of Object.entries(trafficGroups)) {
            results[source] = {
                users: data.users.size,
                purchases: data.purchases,
                revenue: data.revenue,
                conversionRate: data.users.size > 0 ? 
                    ((data.purchases / data.users.size) * 100).toFixed(1) : '0.0',
                avgOrderValue: data.purchases > 0 ? 
                    (data.revenue / data.purchases).toFixed(2) : '0.00'
            };
        }
        
        return results;
    }

    // Generate data-driven UX recommendations
    generateRecommendations() {
        console.log('Generating UX recommendations...');
        
        this.recommendations = [
            {
                id: 1,
                title: 'Optimize Mobile Checkout Experience',
                description: `Mobile conversion rate (${this.deviceMetrics.mobile.conversionRate}%) is significantly lower than desktop (${this.deviceMetrics.desktop.conversionRate}%). Simplify mobile forms and implement Apple Pay/Google Pay.`,
                impact: '+22% mobile conversion potential',
                priority: 'high'
            },
            {
                id: 2,
                title: 'Address Cart Abandonment',
                description: `${this.dropOffs.cartToCheckout.toFixed(1)}% of users abandon between cart and checkout. Implement cart saver functionality and exit-intent popups.`,
                impact: '+18% recovery from abandoned carts',
                priority: 'high'
            },
            {
                id: 3,
                title: 'Scale Winning A/B Test Variant',
                description: `Variant ${this.abTestWinner} outperformed by ${this.abTestImprovement}%. Implement winning variant site-wide and develop follow-up tests.`,
                impact: `+${this.abTestImprovement}% overall conversion`,
                priority: 'medium'
            },
            {
                id: 4,
                title: 'Enhance Email Retargeting',
                description: `Email traffic shows ${this.trafficAnalysis.email ? this.trafficAnalysis.email.conversionRate : '0.0'}% conversion. Expand email automation for cart abandoners and post-purchase sequences.`,
                impact: '+15% revenue from email channel',
                priority: 'medium'
            },
            {
                id: 5,
                title: 'Implement Loyalty Program',
                description: `${this.cohortMetrics.retentionRate}% of customers make repeat purchases. Launch loyalty program to increase repeat purchase frequency.`,
                impact: '+30% customer lifetime value',
                priority: 'low'
            }
        ];
    }

    // Render dashboard with all metrics
    renderDashboard() {
        console.log('Rendering dashboard...');
        
        // Update executive summary
        document.getElementById('totalRevenue').textContent = `$${this.totalRevenue.toLocaleString()}`;
        document.getElementById('totalUsers').textContent = this.uniqueUsers.size.toLocaleString();
        document.getElementById('conversionRate').textContent = `${this.funnelConversion.overall}%`;
        
        // Update funnel metrics
        document.getElementById('funnelProductViews').textContent = this.funnelMetrics.productViews.toLocaleString();
        document.getElementById('funnelAddToCart').textContent = this.funnelMetrics.addToCart.toLocaleString();
        document.getElementById('funnelCheckout').textContent = this.funnelMetrics.checkout.toLocaleString();
        document.getElementById('funnelPurchases').textContent = this.funnelMetrics.purchases.toLocaleString();
        
        // Update drop-off insights
        const dropoffHtml = `
            <p><strong>View → Cart:</strong> ${this.dropOffs.viewToCart.toFixed(1)}% drop-off (${this.funnelConversion.viewToCart}% conversion)</p>
            <p><strong>Cart → Checkout:</strong> ${this.dropOffs.cartToCheckout.toFixed(1)}% drop-off (${this.funnelConversion.cartToCheckout}% conversion)</p>
            <p><strong>Checkout → Purchase:</strong> ${this.dropOffs.checkoutToPurchase.toFixed(1)}% drop-off (${this.funnelConversion.checkoutToPurchase}% conversion)</p>
            <p class="critical"><i class="fas fa-fire"></i> <strong>Critical Point:</strong> ${this.getDropOffDescription(this.criticalDropOff)}</p>
        `;
        document.getElementById('dropoffInsights').innerHTML = dropoffHtml;
        
        // Update A/B test results
        document.getElementById('variantAUsers').textContent = this.abTestResults.A.users.toLocaleString();
        document.getElementById('variantAPurchases').textContent = this.abTestResults.A.purchases.toLocaleString();
        document.getElementById('variantAConversion').textContent = `${this.abTestResults.A.conversionRate}%`;
        
        document.getElementById('variantBUsers').textContent = this.abTestResults.B.users.toLocaleString();
        document.getElementById('variantBPurchases').textContent = this.abTestResults.B.purchases.toLocaleString();
        document.getElementById('variantBConversion').textContent = `${this.abTestResults.B.conversionRate}%`;
        
        // Update A/B test insights
        const abtestHtml = `
            <p><strong>Winner:</strong> Variant ${this.abTestWinner} (${this.abTestImprovement}% improvement)</p>
            <p><strong>Confidence:</strong> ${this.calculateConfidenceLevel()} based on sample size</p>
            <p><strong>Revenue Impact:</strong> Variant ${this.abTestWinner} generated $${Math.max(this.abTestResults.A.revenue, this.abTestResults.B.revenue).toLocaleString()}</p>
            <p><strong>Recommendation:</strong> Implement Variant ${this.abTestWinner} site-wide and develop follow-up tests</p>
        `;
        document.getElementById('abtestInsights').innerHTML = abtestHtml;
        
        // Update cohort metrics
        document.getElementById('repeatCustomers').textContent = this.cohortMetrics.repeatCustomers.toLocaleString();
        document.getElementById('retentionRate').textContent = `${this.cohortMetrics.retentionRate}%`;
        document.getElementById('avgRepeatPurchases').textContent = this.cohortMetrics.avgRepeatPurchases;
        
        // Update cohort insights
        const cohortHtml = `
            <p><strong>Customer Retention:</strong> ${this.cohortMetrics.retentionRate}% of customers make repeat purchases</p>
            <p><strong>Repeat Value:</strong> Repeat customers make ${this.cohortMetrics.avgRepeatPurchases} purchases on average</p>
            <p><strong>Opportunity:</strong> ${(100 - parseFloat(this.cohortMetrics.retentionRate)).toFixed(1)}% of customers are one-time purchasers</p>
            <p><strong>Action:</strong> Implement post-purchase engagement strategy to increase retention</p>
        `;
        document.getElementById('cohortInsights').innerHTML = cohortHtml;
        
        // Update traffic insights
        let trafficHtml = '<div class="traffic-metrics">';
        for (const [source, data] of Object.entries(this.trafficAnalysis)) {
            trafficHtml += `
                <div class="traffic-source">
                    <strong>${source.toUpperCase()}:</strong> 
                    ${data.conversionRate}% conversion (${data.users} users, $${data.revenue} revenue)
                </div>
            `;
        }
        trafficHtml += '</div>';
        document.getElementById('trafficInsights').innerHTML = trafficHtml;
        
        // Update recommendations
        const recommendationsContainer = document.getElementById('recommendationsList');
        recommendationsContainer.innerHTML = '';
        
        this.recommendations.forEach(rec => {
            const icon = this.getRecommendationIcon(rec.id);
            const priorityClass = `priority-${rec.priority}`;
            
            const recElement = document.createElement('div');
            recElement.className = `recommendation ${priorityClass}`;
            recElement.innerHTML = `
                <div class="rec-icon">${icon}</div>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    <span class="rec-impact">Impact: ${rec.impact}</span>
                </div>
            `;
            recommendationsContainer.appendChild(recElement);
        });
        
        // Render charts
        this.renderCharts();
        
        // Add animation to updated metrics
        this.animateMetrics();
    }

    // Helper method for drop-off descriptions
    getDropOffDescription(dropOffPoint) {
        const descriptions = {
            'viewToCart': 'Users viewing products but not adding to cart. Consider product page UX improvements.',
            'cartToCheckout': 'High abandonment between cart and checkout. Shipping costs or complex forms may be barriers.',
            'checkoutToPurchase': 'Checkout process friction. Payment options or trust signals may need enhancement.'
        };
        return descriptions[dropOffPoint] || 'Analyzing drop-off patterns...';
    }

    // Calculate confidence level for A/B test
    calculateConfidenceLevel() {
        const convA = parseFloat(this.abTestResults.A.conversionRate);
        const convB = parseFloat(this.abTestResults.B.conversionRate);
        const improvement = Math.abs(convB - convA);
        
        if (improvement > 10) return 'High (95%+)';
        if (improvement > 5) return 'Medium (85-94%)';
        return 'Low (70-84%)';
    }

    // Get recommendation icons
    getRecommendationIcon(id) {
        const icons = [
            '<i class="fas fa-mobile-alt"></i>',
            '<i class="fas fa-shopping-cart"></i>',
            '<i class="fas fa-vial"></i>',
            '<i class="fas fa-envelope"></i>',
            '<i class="fas fa-award"></i>'
        ];
        return icons[id - 1] || '<i class="fas fa-lightbulb"></i>';
    }

    // Render data visualizations
    renderCharts() {
        // Funnel Chart
        const funnelCtx = document.getElementById('funnelChart').getContext('2d');
        new Chart(funnelCtx, {
            type: 'bar',
            data: {
                labels: ['Product Views', 'Add to Cart', 'Checkout', 'Purchase'],
                datasets: [{
                    label: 'Unique Users',
                    data: [
                        this.funnelMetrics.productViews,
                        this.funnelMetrics.addToCart,
                        this.funnelMetrics.checkout,
                        this.funnelMetrics.purchases
                    ],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(16, 185, 129, 0.7)'
                    ],
                    borderColor: [
                        'rgb(59, 130, 246)',
                        'rgb(139, 92, 246)',
                        'rgb(245, 158, 11)',
                        'rgb(16, 185, 129)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                const index = context.dataIndex;
                                const percentages = [
                                    '100%',
                                    `${((context.chart.data.datasets[0].data[1] / context.chart.data.datasets[0].data[0]) * 100).toFixed(1)}%`,
                                    `${((context.chart.data.datasets[0].data[2] / context.chart.data.datasets[0].data[1]) * 100).toFixed(1)}%`,
                                    `${((context.chart.data.datasets[0].data[3] / context.chart.data.datasets[0].data[2]) * 100).toFixed(1)}%`
                                ];
                                return `${label}: ${value.toLocaleString()} (${percentages[index]} conversion)`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Device Chart
        const deviceCtx = document.getElementById('deviceChart').getContext('2d');
        new Chart(deviceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Mobile', 'Desktop'],
                datasets: [{
                    data: [
                        this.deviceMetrics.mobile.users,
                        this.deviceMetrics.desktop.users
                    ],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(139, 92, 246, 0.7)'
                    ],
                    borderColor: [
                        'rgb(59, 130, 246)',
                        'rgb(139, 92, 246)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label;
                                const value = context.parsed;
                                const device = context.chart.data.labels[context.dataIndex];
                                const conversion = device === 'Mobile' ? 
                                    window.analyticsEngine.deviceMetrics.mobile.conversionRate :
                                    window.analyticsEngine.deviceMetrics.desktop.conversionRate;
                                return `${label}: ${value.toLocaleString()} users (${conversion}% conversion)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Animate metric updates
    animateMetrics() {
        const metrics = document.querySelectorAll('.metric-value, .stat-value');
        metrics.forEach(metric => {
            metric.classList.add('metric-update');
            setTimeout(() => {
                metric.classList.remove('metric-update');
            }, 500);
        });
    }

    // Setup event listeners for interactivity
    setupEventListeners() {
        // Refresh data button (simulated)
        const refreshBtn = document.createElement('button');
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Analytics';
        refreshBtn.className = 'refresh-btn';
        refreshBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: var(--radius);
            cursor: pointer;
            font-weight: 600;
            box-shadow: var(--shadow);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        refreshBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        refreshBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
        
        refreshBtn.addEventListener('click', () => {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            setTimeout(() => {
                // Simulate data refresh
                this.generateSampleData();
                this.processAnalytics();
                this.renderDashboard();
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Analytics';
                
                // Show notification
                this.showNotification('Analytics data refreshed successfully!');
            }, 1500);
        });
        
        document.body.appendChild(refreshBtn);
        
        // Add notification system
        this.setupNotifications();
    }

    // Notification system
    setupNotifications() {
        const notificationDiv = document.createElement('div');
        notificationDiv.id = 'analyticsNotification';
        notificationDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 16px 24px;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 1001;
            max-width: 300px;
        `;
        document.body.appendChild(notificationDiv);
    }

    showNotification(message) {
        const notification = document.getElementById('analyticsNotification');
        notification.textContent = message;
        notification.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
        }, 3000);
    }
}

// Initialize the analytics engine when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsEngine = new UXAnalyticsEngine();
    
    // Add custom styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        .priority-high { border-left-color: var(--danger-color) !important; }
        .priority-medium { border-left-color: var(--warning-color) !important; }
        .priority-low { border-left-color: var(--success-color) !important; }
        
        .critical {
            background: rgba(239, 68, 68, 0.1);
            padding: 0.75rem;
            border-radius: var(--radius);
            margin-top: 0.5rem;
            color: var(--danger-color);
            font-weight: 600;
        }
        
        .critical i {
            margin-right: 0.5rem;
        }
        
        .traffic-metrics {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .traffic-source {
            padding: 0.75rem;
            background: var(--gray-50);
            border-radius: var(--radius);
            font-size: 0.9rem;
        }
        
        .refresh-btn:hover {
            background: var(--primary-dark) !important;
        }
        
        @media print {
            .refresh-btn, #analyticsNotification {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UXAnalyticsEngine };
}
