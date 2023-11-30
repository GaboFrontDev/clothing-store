import { Route } from "@/consts/interfaces";

interface NavigationButtonProps {
    route: Route
}

export function NavigationButton(props: NavigationButtonProps) {
    const { route: { url, displayValue } } = props;

    return <a className="block" href={url}>{displayValue}</a>
}