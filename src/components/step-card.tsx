import { Button, Card, CardContent, CardOverflow, Typography } from "@mui/joy";
import type { Identifier, XYCoord } from "dnd-core";
import type { FC, MouseEventHandler } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import EditIcon from "@mui/icons-material/Edit";
import { Step } from "@/interfaces/step.interface";
import { GridDeleteIcon } from "@mui/x-data-grid";
export interface StepCardProps {
  step: Step;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
  onDelete: (step: Step) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const ItemTypes = {
  CARD: "card",
};

export const StepCard: FC<StepCardProps> = ({
  step,
  index,
  moveCard,
  onClick,
  onDelete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_2, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: step.id, index };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <Card
      ref={ref}
      orientation="horizontal"
      variant="outlined"
      sx={{ mb: 1, cursor: "grab" }}
    >
      <CardContent>
        <Typography textColor="success.darkChannel" sx={{ fontWeight: "md" }}>
          Step {step.id}
        </Typography>
        <Typography level="body-sm">{step.functionBlock?.name}</Typography>
      </CardContent>
      <Button onClick={onClick} variant="soft" size="sm">
        <EditIcon />
      </Button>
      <Button
        onClick={() => {
          onDelete(step);
        }}
        variant="outlined"
        color="danger"
        size="sm"
      >
        <GridDeleteIcon />
      </Button>
      <CardOverflow
        variant="soft"
        color="warning"
        sx={{
          px: 0.2,
          writingMode: "vertical-rl",
          justifyContent: "center",
          fontSize: "xs",
          fontWeight: "xl",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderLeft: "1px solid",
          borderColor: "divider",
        }}
      >
        {index}
      </CardOverflow>
    </Card>
  );
};
