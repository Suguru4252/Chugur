import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import { X } from 'react-feather';

interface EditProfileProps {
    onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onClose }) => {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            await updateProfile(user, {
                displayName: displayName
            });
            onClose();
        } catch (error) {
            console.error('Ошибка обновления профиля:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Редактировать профиль</h2>
                        <button onClick={onClose} className="btn btn-ghost btn-circle">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Имя</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Введите ваше имя"
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                value={user?.email || ''}
                                disabled
                            />
                        </div>

                        <div className="flex gap-2 mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary flex-1"
                                disabled={loading}
                            >
                                {loading ? 'Сохранение...' : 'Сохранить'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-ghost flex-1"
                            >
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
