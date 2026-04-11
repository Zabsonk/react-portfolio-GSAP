import { useRef, useState } from 'react';

interface Props {
    onMove: (dx: number, dy: number) => void;
}

const Joystick = ({ onMove }: Props) => {
    const baseRef = useRef<HTMLDivElement>(null);
    const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
    const active = useRef(false);
    const [isActive, setIsActive] = useState(false);

    const getCenter = () => {
        const rect = baseRef.current!.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!active.current) return;
        const center = getCenter();
        const maxRadius = 40;

        let dx = clientX - center.x;
        let dy = clientY - center.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxRadius) {
            dx = (dx / dist) * maxRadius;
            dy = (dy / dist) * maxRadius;
        }

        setKnobPos({ x: dx, y: dy });
        // onMove(dx / maxRadius, dy / maxRadius);

        console.log(dx / maxRadius, dy / maxRadius);
    };

    const handleEnd = () => {
        active.current = false;
        setKnobPos({ x: 0, y: 0 });
        onMove(0, 0);
    };

    return (
        <div
            ref={baseRef}
            className="joystick-base"
            style={{ opacity: isActive ? 0.9 : 0.4 }}
            onTouchStart={(e) => {
                setIsActive(true);
                active.current = true;
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={() => {
                setIsActive(false);
                handleEnd();
            }}
        >
            <div
                className="joystick-knob"
                style={{ transform: `translate(${knobPos.x}px, ${knobPos.y}px)` }}
            />
        </div>
    );
};

export default Joystick;
