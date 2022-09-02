


let redirect_Page = () => {
  let tID = setTimeout(() => {  
       // window.location.href ="https://test-node2-omega.vercel.app/memorygame.html";
       window.location.href = "http://localhost:3000/memorygame.html";
    window.clearTimeout(tID); // clear time out.
  }, 9000);
};

redirect_Page();
