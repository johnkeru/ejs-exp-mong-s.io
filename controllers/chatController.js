const User = require('../models/User')
const Message = require('../models/Message');

exports.showChatArea = async (req, res) => {
    try {
        const { yourId, otherId } = req.query
        let messages = [];
        if (yourId && otherId) {
            messages = await Message.find({
                $or: [
                    { sender: yourId, receiver: otherId },
                    { sender: otherId, receiver: yourId },
                ]
            })
                .sort({ _id: -1 })
                .limit(20)
                .exec();
        }

        const currentUser = await User.findById(req.session.userId).select('-password')
        const otherUser = await User.findById(otherId).select('-password')
        const users = await User.find({ _id: { $ne: currentUser._id } })
        res.render('chats/chat-area', { users, currentUser, messages: messages.reverse(), otherUser })
    } catch {
        res.redirect('/chat-area')
    }
}

exports.getMessagesPagination = async (req, res) => {
    try {
        const { yourId, otherId, lastMessageId } = req.body

        let messages = await Message.find({
            $and: [
                {
                    $or: [
                        { sender: yourId, receiver: otherId },
                        { sender: otherId, receiver: yourId },
                    ],
                },
                {
                    _id: { $lt: lastMessageId }
                }
            ]
        }).limit(20);
        res.json({ messages, noMore: messages.length < 20 })
    } catch (e) {
        console.log(e.message)
        res.json({ messages: [], error: e.message })
    }
}

