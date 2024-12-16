const Goal = require('../models/goal');

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.findAll({ where: { userId: req.user.id } });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve goals' });
    }
};

exports.addGoal = async (req, res) => {
    try {
        const { title, description, targetAmount, deadline } = req.body;
        const goal = await Goal.create({
            title,
            description,
            targetAmount,
            deadline,
            userId: req.user.id,
        });
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add goal' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, targetAmount, currentAmount, deadline } = req.body;

        const goal = await Goal.findOne({ where: { id, userId: req.user.id } });
        if (!goal) return res.status(404).json({ error: 'Goal not found' });

        await goal.update({ title, description, targetAmount, currentAmount, deadline });
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update goal' });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;

        const goal = await Goal.findOne({ where: { id, userId: req.user.id } });
        if (!goal) return res.status(404).json({ error: 'Goal not found' });

        await goal.destroy();
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete goal' });
    }
};
