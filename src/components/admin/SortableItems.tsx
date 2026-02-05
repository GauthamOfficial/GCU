import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { PortfolioItem, Testimonial } from '@/lib/types'

interface SortablePortfolioItemProps {
    item: PortfolioItem
    children: React.ReactNode
}

export function SortablePortfolioItem({ item, children }: SortablePortfolioItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className="border rounded-lg p-3 relative">
            <div className="absolute top-2 left-2 cursor-grab active:cursor-grabbing z-10" {...attributes} {...listeners}>
                <GripVertical size={20} className="text-gray-400 hover:text-gray-600" />
            </div>
            <div className="pl-6">
                {children}
            </div>
        </div>
    )
}

interface SortableTestimonialItemProps {
    item: Testimonial
    children: React.ReactNode
}

export function SortableTestimonialItem({ item, children }: SortableTestimonialItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className="border rounded-lg p-4 relative">
            <div className="absolute top-4 left-2 cursor-grab active:cursor-grabbing z-10" {...attributes} {...listeners}>
                <GripVertical size={20} className="text-gray-400 hover:text-gray-600" />
            </div>
            <div className="pl-6">
                {children}
            </div>
        </div>
    )
}
