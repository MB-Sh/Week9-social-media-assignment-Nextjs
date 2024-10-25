//usually you don't have a separate route for an error
//we are using this page for testing our custom error page

export default function BrokenPage() {
    //we are going to simulate an error
    throw new Error("Ooopppppsssss, I borke");
    return (
      <>
        <h1>Broken Page</h1>
    
      </>
    );
  }