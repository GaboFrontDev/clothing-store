interface PageProps {
  searchParams: {
    t: string;
  };
}

export default function VerifyLoginPage(props: PageProps) {
    const {searchParams: {t: token} } = props;

    return <></>
}