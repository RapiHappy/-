// Handles energy level tracking and burnout prevention
const burnoutSystem = {
    init() {
        // Check if energy was already set today
        const userData = StorageManager.getUserData();
        const today = new Date().toISOString().split('T')[0];
        
        if (userData.lastEnergyDate !== today) {
            this.promptEnergyLevel();
        } else {
            this.updateUILabel(userData.energyLevel);
        }

        // Setup listeners
        document.querySelectorAll('.btn-energy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setEnergyLevel(e.target.dataset.level);
            });
        });
    },

    promptEnergyLevel() {
        document.getElementById('modal-energy').classList.add('active');
    },

    setEnergyLevel(level) {
        const userData = StorageManager.getUserData();
        userData.energyLevel = level;
        userData.lastEnergyDate = new Date().toISOString().split('T')[0];
        StorageManager.saveUserData(userData);
        
        document.getElementById('modal-energy').classList.remove('active');
        this.updateUILabel(level);
        
        // Re-generate planner based on energy
        if(window.plannerSystem) plannerSystem.generatePlan(level);
    },

    updateUILabel(level) {
        const badge = document.getElementById('energy-badge');
        if (level === 'high') badge.innerHTML = 'Энергия: 🟢 Высокая';
        if (level === 'medium') badge.innerHTML = 'Энергия: 🟡 Средняя';
        if (level === 'low') badge.innerHTML = 'Энергия: 🔴 Низкая';
    }
};
