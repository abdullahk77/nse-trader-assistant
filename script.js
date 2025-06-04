async function fetchSignals() {
  try {
    const response = await fetch('https://hqaimtrader.pythonanywhere.com/signals.json');
    const signalData = await response.json();

    const feed = document.getElementById('signalFeed');
    feed.innerHTML = ''; // Clear previous content

    if (signalData.signals.length === 0) {
      feed.innerHTML = '<p style="text-align:center; color: gray;">No active signals at the moment.</p>';
    } else {
      signalData.signals.forEach(signal => {
        const card = document.createElement('div');
        card.className = `card ${signal.type.toLowerCase()}`;
        card.innerHTML = `
          <h2>${signal.stock}</h2>
          <p class="type">${signal.type} • ${signal.trade}</p>
          <p>🎯 Entry: ₹${signal.entry}</p>
          <p>📍 Stop-Loss: ₹${signal.stop_loss}</p>
          <p>🚀 Target: ₹${signal.target}</p>
          <p>📰 Note: ${signal.note}</p>
        `;
        feed.appendChild(card);
      });
    }

    document.getElementById('lastUpdated').innerText = 'Last updated: ' + new Date().toLocaleTimeString();
  } catch (error) {
    console.error('Error fetching signal data:', error);
    document.getElementById('signalFeed').innerHTML = '<p style="color:red;">Failed to load signals. Please try again later.</p>';
  }
}

// Initial fetch and set to auto-refresh every 5 minutes
fetchSignals();
setInterval(fetchSignals, 300000);
