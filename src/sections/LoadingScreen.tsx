import { useEffect, useState } from 'react';

const LoadingScreen = ({ visible }: { visible: boolean }) => {
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        if (!visible) {
            const t = setTimeout(() => setMounted(false), 600);
            return () => clearTimeout(t);
        }
    }, [visible]);

    if (!mounted) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.6s ease',
            }}
        >
            <div
                style={{
                    color: '#fff',
                    fontSize: '14px',
                    letterSpacing: '0.2em',
                    opacity: 0.6,
                    fontFamily: 'monospace',
                }}
            >
                loading...
            </div>
        </div>
    );
};

export default LoadingScreen;
