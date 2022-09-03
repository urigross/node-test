


let redirect_Page = () => {
  let tID = setTimeout(() => {  
       window.location.href = "https://node-test-git-vercel2-urigross.vercel.app/memorygame.html";
    window.clearTimeout(tID); // clear time out.
  }, 9000);
};

redirect_Page();
