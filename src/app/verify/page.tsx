interface PageProps {
    searchParams: {
      t: string;
    };
  }
  

export default function VerifyPage(props: PageProps){
    const {searchParams: {t: token} } = props;

}