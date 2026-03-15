import React from 'react';
import { MoreVertical, Phone, Video, Users, Info } from 'react-feather';

interface TopMenuBarProps {
    chatName: string;
    chatType: 'private' | 'group';
    online?: boolean;
    onMenuClick: () => void;
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({
    chatName,
    chatType,
    online,
    onMenuClick
}) => {
    return (
        <div className="flex items-center justify-between p-4 border-b bg-base-100">
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                        <span className="text-lg font-semibold">
                            {chatName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold text-lg">{chatName}</h2>
                    <p className="text-sm text-base-content/70">
                        {chatType === 'private' 
                            ? (online ? 'в сети' : 'не в сети')
                            : 'групповой чат'
                        }
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {chatType === 'private' && (
                    <>
                        <button className="btn btn-ghost btn-circle">
                            <Phone size={20} />
                        </button>
                        <button className="btn btn-ghost btn-circle">
                            <Video size={20} />
                        </button>
                    </>
                )}
                {chatType === 'group' && (
                    <button className="btn btn-ghost btn-circle">
                        <Users size={20} />
                    </button>
                )}
                <button className="btn btn-ghost btn-circle">
                    <Info size={20} />
                </button>
                <button onClick={onMenuClick} className="btn btn-ghost btn-circle">
                    <MoreVertical size={20} />
                </button>
            </div>
        </div>
    );
};

export default TopMenuBar;
