import { useRef, useState } from 'react';
import type JoystickController from './JoystickController';

interface Props {
    visible: boolean;
    controller: JoystickController | null;
}

const Joystick = ({ visible, controller }: Props) => {
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

        if (dy > 0) {
            dy = 0;
        }

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxRadius) {
            dx = (dx / dist) * maxRadius;
            dy = (dy / dist) * maxRadius;
        }

        setKnobPos({ x: dx, y: dy });

        const ndx = dx / maxRadius;
        const ndy = dy / maxRadius;

        controller?.onMove(ndx, ndy);
    };

    const handleEnd = () => {
        active.current = false;
        setIsActive(false);
        setKnobPos({ x: 0, y: 0 });

        if (!controller) return;
        controller.onEnd();
    };

    return (
        <div
            ref={baseRef}
            className="joystick-base"
            style={{
                opacity: visible ? (isActive ? 0.8 : 0.4) : 0,
                pointerEvents: visible ? 'auto' : 'none',
                transition: 'opacity 0.3s ease',
            }}
            onTouchStart={(e) => {
                active.current = true;
                setIsActive(true);
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={handleEnd}
        >
            <div
                className="joystick-knob"
                style={{ transform: `translate(${knobPos.x}px, ${knobPos.y}px)` }}
            />
        </div>
    );
};

export default Joystick;
