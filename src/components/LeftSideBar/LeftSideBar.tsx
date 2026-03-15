import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { MessageSquare, Users, Settings, LogOut, Search, Plus } from 'react-feather';

interface LeftSideBarProps {
    onSelectChat: (chatId: string) => void;
    selectedChatId?: string;
    onEditProfile: () => void;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ onSelectChat, selectedChatId, onEditProfile }) => {
    const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [chats, setChats] = React.useState<any[]>([]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    };

    return (
        <div className="w-80 h-full flex flex-col border-r bg-base-100">
            <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || 'Пользователь'} />
                            ) : (
                                <span className="text-xl font-semibold">
                                    {user?.displayName?.charAt(0) || 'П'}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 cursor-pointer" onClick={onEditProfile}>
                        <h3 className="font-semibold hover:underline">{user?.displayName || 'Пользователь'}</h3>
                        <p className="text-sm text-base-content/70">Нажмите для редактирования</p>
                    </div>
                    <button className="btn btn-ghost btn-circle">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            <div className="p-4 border-b">
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-base-content/40" size={18} />
                        <input
                            type="text"
                            placeholder="Поиск..."
                            className="input input-bordered w-full pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary">
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <div className="mb-2 px-2 text-sm font-semibold text-base-content/70">
                    Чаты
                </div>
                {chats.map(chat => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                        isSelected={selectedChatId === chat.id}
                        onClick={() => onSelectChat(chat.id)}
                    />
                ))}
            </div>

            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="btn btn-ghost w-full justify-start gap-2"
                >
                    <LogOut size={20} />
                    Выйти
                </button>
            </div>
        </div>
    );
};

const ChatItem: React.FC<{ chat: any; isSelected: boolean; onClick: () => void }> = ({
    chat,
    isSelected,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-base-200 transition-colors ${
                isSelected ? 'bg-primary/10' : ''
            }`}
        >
            <div className="avatar">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    {chat.photoURL ? (
                        <img src={chat.photoURL} alt={chat.name} />
                    ) : (
                        <MessageSquare size={24} />
                    )}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">{chat.name || 'Чат'}</h4>
                <p className="text-sm text-base-content/70 truncate">
                    {chat.lastMessage || 'Нет сообщений'}
                </p>
            </div>
            {chat.unreadCount > 0 && (
                <div className="badge badge-primary">{chat.unreadCount}</div>
            )}
        </div>
    );
};

export default LeftSideBar;
