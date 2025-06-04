async function fetchSignals() {
  try {
    const response = await fetch('https://hqaimtrader.pythonanywhere.com/signals.json');
    const signalData = await response.json();

    const feed = document.getElementById('signalFeed');
    feed.innerHTML = ''; // Clear previous

    signalData.signals.forEach(signal => {
      const card = document.createElement('div');
      card.className = `card ${signal.type.toLowerCase()}`;
      card.innerHTML = `
        <h2>${signal.stock}</h2>
        <p class="type">${signal.strategy || 'Strategy'} • ${signal.type}</p>
        <p>🎯 Entry: ₹${signal.entry}</p>
        <p>📍 Stop-Loss: ₹${signal.stop_loss}</p>
        <p>🚀 Target: ₹${signal.target}</p>
        <p>📊 Trade Type: ${signal.trade}</p>
        <p>📰 Note: ${signal.note}</p>
      `;
      feed.appendChild(card);
    });

    document.getElementById('lastUpdated').innerText = 'Last updated: ' + new Date().toLocaleTimeString();
  } catch (error) {
    console.error('Error fetching signal data:', error);
  }
}

// Fetch every 5 minutes
fetchSignals();
setInterval(fetchSignals, 300000);
