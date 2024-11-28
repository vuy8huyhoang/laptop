const Modal = ({ isOpen, message, onClose }: { isOpen: boolean; message: string; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg mx-4 bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl ring-1 ring-white/20 p-6 transition-transform duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full p-2 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="text-center">
                    <svg
                        className="mx-auto w-16 h-16 text-yellow-400 animate-bounce"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 16h-1v-4h-1m0 0h1.5m.5 4h1.5m-2-9.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm9 8.5V10m0 0V8a2 2 0 00-2-2h-4l-2-2m-5 5v2a2 2 0 002 2h4m-5 9a2 2 0 11-4 0 2 2 0 014 0zm5-2a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 104 0 2 2 0 00-4 0zm0 4h4"
                        />
                    </svg>

                    <h2 className="mt-4 text-3xl font-extrabold text-white font-poppins">
                        Thông báo
                    </h2>

                    <p className="mt-2 text-sm text-gray-300 font-light font-poppins">
                        {message}
                    </p>

                    <div className="mt-6">
                        <button
                            onClick={onClose}
                            className="inline-block w-32 py-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-sm font-bold text-white rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 font-poppins"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
