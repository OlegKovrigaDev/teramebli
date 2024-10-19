import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { AccordProps } from "@/types";

export const Accord = ({
  title,
  className,
  children,
  onToggle,
}: AccordProps) => {
  return (
    <div className="accord-wrapper" onClick={onToggle}>
      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1" className="accord-item">
          <AccordionTrigger
            className={`accord-trigger hover:no-underline ${className}`}
          >
            {title}
          </AccordionTrigger>
          <AccordionContent className="accord-content">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
