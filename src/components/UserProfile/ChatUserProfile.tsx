import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { X, Mail, Calendar, Edit2 } from 'react-feather';

interface UserProfileProps {
    userId?: string;
    onClose: () => void;
    onEdit?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, onClose, onEdit }) => {
    const { user } = useAuth();
    const isCurrentUser = !userId || userId === user?.uid;

    const profileUser = isCurrentUser ? user : null; // Здесь должна быть загрузка данных пользователя

    if (!profileUser) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <p>Загрузка...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Профиль</h2>
                        <button onClick={onClose} className="btn btn-ghost btn-circle">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                        <div className="avatar mb-4">
                            <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                {profileUser.photoURL ? (
                                    <img src={profileUser.photoURL} alt={profileUser.displayName || ''} />
                                ) : (
                                    <span className="text-3xl font-semibold">
                                        {profileUser.displayName?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold">{profileUser.displayName || 'Без имени'}</h3>
                        
                        {isCurrentUser && (
                            <button 
                                onClick={onEdit}
                                className="btn btn-outline btn-sm mt-2 gap-2"
                            >
                                <Edit2 size={16} />
                                Редактировать
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                            <Mail className="text-primary" size={20} />
                            <div>
                                <p className="text-sm text-base-content/70">Email</p>
                                <p className="font-medium">{profileUser.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                            <Calendar className="text-primary" size={20} />
                            <div>
                                <p className="text-sm text-base-content/70">Зарегистрирован</p>
                                <p className="font-medium">
                                    {profileUser.metadata?.creationTime 
                                        ? new Date(profileUser.metadata.creationTime).toLocaleDateString('ru-RU')
                                        : 'Неизвестно'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {!isCurrentUser && (
                        <div className="flex gap-2 mt-6">
                            <button className="btn btn-primary flex-1">
                                Написать сообщение
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
