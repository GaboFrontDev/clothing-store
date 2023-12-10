export default function Form(props: React.ComponentProps<"form">) {
    return <form {...props}>{props.children}</form>;
}