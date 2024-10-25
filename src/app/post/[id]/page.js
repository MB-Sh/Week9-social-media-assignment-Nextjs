export default async function IdPage({params}){
    const myParams= await params;

    return(
      <>
      <h1>Posts Ids{myParams.id}</h1>
      </>
    );
  }
  