import { ROUTES } from "@/consts";
import { NavigationButton } from "./NavigationButton";

export function Routes() {
    return <>
        {ROUTES.map(route =>
            <NavigationButton
                key={`route-${route.displayValue}`}
                route={route}
            />
        )}
    </>
}