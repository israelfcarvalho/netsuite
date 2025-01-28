export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: string
    label: string
    enableCopy?: boolean
}