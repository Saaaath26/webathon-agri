const API = "http://127.0.0.1:5000";

// Live Price
function getPrice() {
    let crop = document.getElementById("priceCrop").value.trim();
    
    if (!crop) {
        document.getElementById("priceResult").innerHTML = '<p style="color: #e74c3c;">Please enter a crop name</p>';
        return;
    }

    document.getElementById("priceResult").innerHTML = '<div class="loading"></div> Fetching price data...';

    fetch(API + "/price", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({crop: crop})
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            document.getElementById("priceResult").innerHTML = '<p style="color: #e74c3c;">' + data.error + '</p>';
            return;
        }
        
        let trendIcon = data.price_trend === "Rising" ? "📈" : data.price_trend === "Falling" ? "📉" : "➡️";
        let actionColor = data.recommended_action === "Sell" ? "#2ecc71" : "#f39c12";
        
        let financialHTML = '';
        if (data.financial_data) {
            const fd = data.financial_data;
            financialHTML = `
            <div style="margin-top: 15px; padding: 15px; background: linear-gradient(135deg, rgba(243, 156, 18, 0.2), rgba(230, 126, 34, 0.3)); border-radius: 10px; border: 1px solid rgba(243, 156, 18, 0.3);">
                <p style="color: #f39c12; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-chart-pie"></i> Financial Overview</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                    <div style="padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Cost/Acre</div>
                        <div style="font-weight: 600; color: #e74c3c;">${fd.cost_per_acre}</div>
                    </div>
                    <div style="padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Revenue/Acre</div>
                        <div style="font-weight: 600; color: #2ecc71;">${fd.revenue_per_acre}</div>
                    </div>
                    <div style="padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Profit/Acre</div>
                        <div style="font-weight: 600; color: #3498db;">${fd.profit_per_acre}</div>
                    </div>
                    <div style="padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Yield/Acre</div>
                        <div style="font-weight: 600;">${fd.expected_yield}</div>
                    </div>
                    <div style="padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Best Season</div>
                        <div style="font-weight: 600;">${fd.best_season}</div>
                    </div>
                    <div style="padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Export</div>
                        <div style="font-weight: 600;">${fd.export_potential}</div>
                    </div>
                </div>
            </div>
            `;
        }
        
        document.getElementById("priceResult").innerHTML = `
            <div style="display: grid; gap: 10px;">
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-tag"></i> Crop:</span>
                    <span style="color: #2ecc71; font-weight: 600;">${data.crop}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-rupee-sign"></i> Current Price:</span>
                    <span style="color: #f39c12; font-weight: 700; font-size: 1.2rem;">₹${data.current_price}/quintal</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-chart-line"></i> Trend:</span>
                    <span>${trendIcon} ${data.price_trend}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-crystal-ball"></i> Next Month:</span>
                    <span>₹${data.predicted_price_next_month}/quintal</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-signal"></i> Market:</span>
                    <span>${data.market_status}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; margin-top: 5px;">
                    <span><i class="fas fa-lightbulb"></i> Recommendation:</span>
                    <span style="color: ${actionColor}; font-weight: 700; font-size: 1.1rem;">${data.recommended_action}</span>
                </div>
                <p style="color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-top: 5px;">${data.suggestion}</p>
            </div>
            ${financialHTML}
        `;
    })
    .catch(err => {
        document.getElementById("priceResult").innerHTML = '<p style="color: #e74c3c;">Error fetching data. Please try again.</p>';
    });
}

// Harvest Prediction
function getHarvest() {
    let crop = document.getElementById("harvestCrop").value.trim();
    let sowing_date = document.getElementById("sowingDate").value;

    if (!crop || !sowing_date) {
        document.getElementById("harvestResult").innerHTML = '<p style="color: #e74c3c;">Please enter crop name and sowing date</p>';
        return;
    }

    document.getElementById("harvestResult").innerHTML = '<div class="loading"></div> Calculating harvest date...';

    fetch(API + "/harvest", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({crop: crop, sowing_date: sowing_date})
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            document.getElementById("harvestResult").innerHTML = '<p style="color: #e74c3c;">' + data.error + '</p>';
            return;
        }
        
        document.getElementById("harvestResult").innerHTML = `
            <div style="display: grid; gap: 8px;">
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-seedling"></i> Crop:</span>
                    <span style="color: #2ecc71; font-weight: 600;">${data.crop}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-calendar"></i> Sowing Date:</span>
                    <span>${data.sowing_date}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-hourglass-half"></i> Duration:</span>
                    <span>${data.days_to_harvest} days</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-calendar-check"></i> Harvest Date:</span>
                    <span style="color: #f39c12; font-weight: 700;">${data.expected_harvest_date}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-cloud"></i> Season:</span>
                    <span>${data.season}</span>
                </div>
                <div style="margin-top: 10px; padding: 10px; background: rgba(46, 204, 113, 0.1); border-radius: 8px; border-left: 3px solid #2ecc71;">
                    <span style="color: #2ecc71; font-weight: 600;"><i class="fas fa-clipboard-list"></i> Growth Stages:</span>
                    <ul style="margin: 8px 0 0 20px; color: rgba(255,255,255,0.8); font-size: 0.9rem;">
                        <li>🌱 Vegetative: ${data.growth_stages.vegetative_stage}</li>
                        <li>🌸 Flowering: ${data.growth_stages.flowering_stage}</li>
                        <li>🌾 Maturity: ${data.growth_stages.maturity_stage}</li>
                    </ul>
                </div>
                <p style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-top: 8px;"><i class="fas fa-info-circle"></i> ${data.tips}</p>
                <p style="color: #e74c3c; font-size: 0.85rem;"><i class="fas fa-exclamation-triangle"></i> ${data.alert}</p>
            </div>
        `;
    })
    .catch(err => {
        document.getElementById("harvestResult").innerHTML = '<p style="color: #e74c3c;">Error fetching data. Please try again.</p>';
    });
}

// Rotation
function getRotation() {
    let crop = document.getElementById("rotationCrop").value.trim();

    if (!crop) {
        document.getElementById("rotationResult").innerHTML = '<p style="color: #e74c3c;">Please enter current crop</p>';
        return;
    }

    document.getElementById("rotationResult").innerHTML = '<div class="loading"></div> Finding best rotation...';

    fetch(API + "/rotation", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({crop: crop})
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            document.getElementById("rotationResult").innerHTML = '<p style="color: #e74c3c;">' + data.error + '</p>';
            return;
        }
        
        let financialHTML = '';
        if (data.financial) {
            financialHTML = `
            <div style="margin-top: 15px; padding: 15px; background: linear-gradient(135deg, rgba(46, 204, 113, 0.2), rgba(39, 174, 96, 0.3)); border-radius: 10px; border: 1px solid rgba(46, 204, 113, 0.3);">
                <p style="color: #2ecc71; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;"><i class="fas fa-rupee-sign"></i> Financial Projection</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center;">
                    <div style="padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Est. Cost</div>
                        <div style="font-weight: 700; color: #e74c3c;">${data.financial.estimated_cost}</div>
                    </div>
                    <div style="padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Revenue</div>
                        <div style="font-weight: 700; color: #2ecc71;">${data.financial.expected_revenue}</div>
                    </div>
                    <div style="padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Profit</div>
                        <div style="font-weight: 700; color: #f39c12;">${data.financial.profit_margin}</div>
                    </div>
                </div>
            </div>
            `;
        }
        
        document.getElementById("rotationResult").innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; padding: 20px 0;">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 5px;">🌾</div>
                    <div style="color: rgba(255,255,255,0.7); font-size: 0.8rem;">Current</div>
                    <div style="font-weight: 600;">${data.current_crop}</div>
                </div>
                <div style="font-size: 2rem; color: #2ecc71;">➜</div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 5px;">🌱</div>
                    <div style="color: rgba(255,255,255,0.7); font-size: 0.8rem;">Next Crop</div>
                    <div style="font-weight: 600; color: #2ecc71;">${data.next_crop}</div>
                </div>
            </div>
            <div style="padding: 15px; background: rgba(52, 152, 219, 0.1); border-radius: 10px; border-left: 3px solid #3498db; margin-top: 10px;">
                <p style="color: #3498db; font-weight: 600; margin-bottom: 5px;"><i class="fas fa-heart"></i> Benefit</p>
                <p>${data.benefit}</p>
            </div>
            <div style="padding: 15px; background: rgba(46, 204, 113, 0.1); border-radius: 10px; border-left: 3px solid #2ecc71; margin-top: 10px;">
                <p style="color: #2ecc71; font-weight: 600; margin-bottom: 5px;"><i class="fas fa-lightbulb"></i> Advice</p>
                <p>${data.advice}</p>
            </div>
            ${financialHTML}
        `;
    })
    .catch(err => {
        document.getElementById("rotationResult").innerHTML = '<p style="color: #e74c3c;">Error fetching data. Please try again.</p>';
    });
}

// Soil
function checkSoil() {
    let soil = document.getElementById("soilType").value.trim();
    let crop = document.getElementById("soilCrop").value.trim();

    if (!soil || !crop) {
        document.getElementById("soilResult").innerHTML = '<p style="color: #e74c3c;">Please enter soil type and crop</p>';
        return;
    }

    document.getElementById("soilResult").innerHTML = '<div class="loading"></div> Analyzing soil compatibility...';

    fetch(API + "/soil", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({soil: soil, crop: crop})
    })
    .then(res => res.json())
    .then(data => {
        let suitabilityColor = data.suitability === "High" ? "#2ecc71" : data.suitability === "Medium" ? "#f39c12" : "#e74c3c";
        let suitabilityIcon = data.suitability === "High" ? "✅" : data.suitability === "Medium" ? "⚠️" : "❌";
        
        document.getElementById("soilResult").innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">${suitabilityIcon}</div>
                <div style="font-size: 1.5rem; font-weight: 700; color: ${suitabilityColor};">${data.suitability} Suitability</div>
            </div>
            <div style="display: grid; gap: 8px;">
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-layer-group"></i> Soil Type:</span>
                    <span>${data.soil_type}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span><i class="fas fa-seedling"></i> Crop:</span>
                    <span>${data.crop}</span>
                </div>
            </div>
            <div style="padding: 15px; background: rgba(46, 204, 113, 0.1); border-radius: 10px; border-left: 3px solid #2ecc71; margin-top: 15px;">
                <p style="color: #2ecc71; font-weight: 600; margin-bottom: 5px;"><i class="fas fa-comment-dots"></i> ${data.suggestion}</p>
                <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">${data.notes}</p>
            </div>
        `;
    })
    .catch(err => {
        document.getElementById("soilResult").innerHTML = '<p style="color: #e74c3c;">Error fetching data. Please try again.</p>';
    });
}

// Weather
function getWeather() {
    document.getElementById("weatherResult").innerHTML = '<div class="loading"></div> Loading weather data...';

    fetch(API + "/weather")
    .then(res => res.json())
    .then(data => {
        let riskColor = data.risk_level === "High" ? "#e74c3c" : data.risk_level === "Medium" ? "#f39c12" : "#2ecc71";
        
        document.getElementById("weatherResult").innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
                <div>
                    <strong><i class="fas fa-cloud"></i> ${data.forecast}</strong>
                </div>
                <div style="display: flex; gap: 15px; font-size: 0.9rem;">
                    <span><i class="fas fa-thermometer-half"></i> ${data.temperature}</span>
                    <span><i class="fas fa-tint"></i> ${data.humidity}</span>
                    <span style="color: ${riskColor}; font-weight: 600;"><i class="fas fa-exclamation-circle"></i> ${data.risk_level} Risk</span>
                </div>
            </div>
            <div style="margin-top: 10px; padding: 10px; background: rgba(243, 156, 18, 0.1); border-radius: 8px;">
                <strong><i class="fas fa-lightbulb"></i> Recommendation:</strong> ${data.recommendation}
            </div>
            ${data.alerts && data.alerts.length > 0 ? `
            <div style="margin-top: 8px; padding: 10px; background: rgba(231, 76, 60, 0.1); border-radius: 8px;">
                <strong><i class="fas fa-bell"></i> Alerts:</strong> ${data.alerts.join(", ")}
            </div>
            ` : ''}
        `;
    })
    .catch(err => {
        document.getElementById("weatherResult").innerHTML = '<span style="color: #e74c3c;">Error loading weather data</span>';
    });
}

// Initialize weather on load
document.addEventListener('DOMContentLoaded', function() {
    getWeather();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
});

// Theme Toggle Function
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'dark') {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', newTheme);
    }
    
    localStorage.setItem('theme', newTheme);
}

