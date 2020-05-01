import * as React from "react";

interface Position {
    // value: string | null;
    x: number;
    y: number;
}

const POSITION = {x:0, y:0};

interface DraggeableProps {
    children: any;
    onDrag(position: Position, id: number): void;
    onDragEnd(position: Position, id: number): void;
    id: number;
}

const Draggeable: React.FC<DraggeableProps> = props => {
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [origin, setOrigin] = React.useState<Position>(POSITION);
    const [translation, setTranslation] = React.useState<Position>(POSITION);

    const handleMouseDown = (ev: React.MouseEvent): void => {
        setIsDragging(true);
        console.log(`cx:${ev.clientX}, cy:${ev.clientY}`)
        setOrigin({x: ev.clientX, y: ev.clientY});
        setTranslation(POSITION);
    };

    const handleMouseMove = (ev: MouseEvent): void => {
        console.log(`ox:${origin.x}, oy:${origin.y}`)
        const translation = {x:ev.clientX - origin.x, y:ev.clientY - origin.y};
        console.log(ev.clientX, ev.clientY, 'origin', origin, 'translation', translation)
        setTranslation(translation);
        // props.onDrag(translation, props.id);
    };

    const handleMouseUp = (ev: MouseEvent): void => {
        console.log('mups');
        setIsDragging(false);
        setOrigin({x: ev.clientX, y: ev.clientY});
        console.log('after up new origin', origin);
        setTranslation(POSITION);
    
        props.onDragEnd(translation, props.id);
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return (): void => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging, setTranslation, handleMouseMove, handleMouseUp]);

    const styles = React.useMemo<React.CSSProperties>(() => ({
        cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',
        transform: isDragging ? `translate(${translation.x}px, ${translation.y}px)` : 'none',
        transition: isDragging ? 'none' : 'none', //'transform 500ms',
        zIndex: isDragging ? 2: 1,
        position: isDragging ? 'absolute' : 'absolute'
    }), [isDragging, translation]);

    return (
        <div style={styles} onMouseDown={handleMouseDown}>
            {props.children}
        </div>
    );
};

export default Draggeable;
