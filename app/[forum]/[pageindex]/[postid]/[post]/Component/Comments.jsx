import React, { useEffect, useRef, forwardRef, memo, useCallback, useMemo, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import Tipt from "./Body/Tipt"
import CommentCp from "./Body/CommentCp";
import { loggeds } from "@/app/action";
import { useSnapshot } from "valtio";

const Comments = forwardRef(({
   pid, postid, fullUrl, mod, profi, allow, HandleComment, profile
}, ref) => {
  const Comment = useSnapshot(loggeds).Comment
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  const navigate = useRouter();
  const send = useSnapshot(loggeds).send2
  const editcontent  = useSnapshot(loggeds).editcontent
  const scrollToElement = useCallback((selector, offsetTop = 200) => {
    const element = document.getElementById(selector);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offsetTop;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'auto'
    });
  }, []);

  const isLessThanTenMinutesAgo = useCallback((timestamp) => {
    const now = new Date();
    const givenTime = new Date(timestamp);
    const differenceInMilliseconds = now - givenTime;
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    return differenceInMinutes < 5;
  }, []);

  const Vote = useCallback(async (vote) => {
    try {
      const logg = localStorage.getItem("data");
      const logged = JSON.parse(logg);
      if (!logged) return;

      if (!vote.id) return;

      const token = logged.token;
      const datas = {
        voteType: vote.vote,
        postId: vote.id,
        reply: vote.reply,
        replyId: vote.replyId
      };

      const data = await fetch(
        `${Api}/post/${postid}/user/${pid}/vote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "auth-token": token },
          body: JSON.stringify(datas),
        }
      );

      await data.json();
    } catch (e) {
      console.log(e);
    }
  }, [postid, pid]);



  const handleClear = useCallback(() => {
    loggeds.editcontent = ""
    loggeds.eid = ""
    loggeds.name =""
    loggeds.postpart = ""
    loggeds.Quote = false
    loggeds.Rep = false
    loggeds.boxid = ""
    loggeds.quotemgs = ""
    loggeds.edit = { type: false }
    loggeds.quoteid = ""
    loggeds.Rep = false
    loggeds.Repid = ""
    scrollToElement();
  }, []);


  return (
    <div className="mb-5">
      <div>
        {Comment.map((ei, i) => {
          const idb = `${i + 1}`;
          return (
            <div id={`post-${idb}`} key={ei._id}>
              {ei?.deleted ? (
                <div className="py-1 text-sm opacity-50 px-3 bg-chatbg mb-3">
                  <p>Comment deleted</p>
                </div>
              ) : (
                <div className="min-h-40 bg-chatbg mb-3">
                  <CommentCp
                    scrollToElement={scrollToElement}
                    ei={ei}
                    idb={idb}
                    i={i}
                    profile={profile}
                    pid={pid}
                    postid={postid}
                    fullUrl={fullUrl}
                    mod={mod}
                    profi={profi}
                    allow={allow}
                    HandleComment={HandleComment}
                    navigate={navigate}
                    isLessThanTenMinutesAgo={isLessThanTenMinutesAgo}
                    Vote={Vote}
                    
                  />
                  <div id={ei._id} ></div>
                  <Tipt profi={profi} editcontent={editcontent} send={send} HandleComment={HandleComment} handleClear={handleClear} ref={ref} ei={ei}/>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

const MemoizedComments = memo(Comments);

export default MemoizedComments;
