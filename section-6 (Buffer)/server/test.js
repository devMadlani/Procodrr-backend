fetch("http://localhost:3000")
  .then((res) => res.arrayBuffer())
  .then((data) => {
    const unit8Array = new Uint8Array(data);
    const decoder = new TextDecoder();

    console.log(decoder.decode(data));
  });
