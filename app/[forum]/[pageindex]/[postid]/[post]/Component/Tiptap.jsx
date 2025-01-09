import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Tip from './Tip';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Imagesprofile from '@/app/Component/Tab/images';
import iframe from './iframe';
import { Node } from '@tiptap/core';
import Highlight from '@tiptap/extension-highlight';
import { loggeds } from '@/app/action';

const Tiptap = forwardRef(({ show = false, send, profile, reply = false, editcontent = "" }, ref) => {
  const Placeholder = Node.create({
    name: 'placeholder',
    group: 'inline',
    inline: true,
    atom: true,
    addAttributes() {
      return {
        id: {
          default: null,
        },
      };
    },
    parseHTML() {
      return [
        {
          tag: 'strong[data-placeholder-id]',
        },
      ];
    },
    renderHTML({ node }) {
      return ['span', { 'data-placeholder-id': node.attrs.id, class: 'loading-placeholder' }, 'loading preview...'];
    },
  });

  const reftag = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      iframe,
      Image.configure({
        allowBase64:true,
        inline: true,
        HTMLAttributes: {
          class: 'max-w-72 max-h-72 inline m-[2px]',
        },
      }),
      TextStyle,
      Color,
      Link.extend({
        inclusive: false,
      }).configure({
        autolink: true,
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue',
        },
      }),
      Youtube.configure({
        controls: false,
      }),
      Placeholder,
      Highlight.configure({ multicolor: true }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: ` bg-[#42464D] cursor-text px-4 py-2 pb-10 ${reply ? "h-24 outline-blue" : "h-40 lg:border-l-0"} scrollbar-none outline-none border-opacity-10 justify-start border-b-[1px] lg:border-r border-x border-white text-white items-start w-full overflow-y-scroll font-medium prose max-w-none prose-p:h-fit  prose-code:text-[#FFFDD0]  prose-code:bg-blacke prose-code:text-xs prose-code:p-1`,
      },
    },
    onFocus({ editor, event }) {
      if(!reply)
      {
        loggeds.eid = ""
        loggeds.Rep = false
        loggeds.edit = {type:false}
        loggeds.Quote = false
        loggeds.boxid = ""
        loggeds.quotemgs = ""
        loggeds.name = ""
        loggeds.Repid = ""
        loggeds.quoteid = ""
        loggeds.editcontent = ""
      }
    }
  });

  // Set reftag.current to editor as the first thing
  reftag.current = editor;

  useEffect(() => {
    if (reftag?.current && reply) {
      reftag.current.commands.setContent(editcontent);
    }
  }, [editcontent, reply]);



  useEffect(() => {
   
    if (reftag?.current && reply) {
     
      reftag.current.commands.focus();
    }
  }, [reftag?.current]);

  const Clear = () => {
    editor?.commands?.clearContent();
  };

  useEffect(() => {
    Clear();
  }, [send]);

  useImperativeHandle(ref, () => ({
    getEditor: () => reftag.current,
  }));

  return (
    <div className='flex justify-between'>
      {show && (
        <div className='px-3 hidden rounded-tl-md border-opacity-10 bg-[#383C42] select-text border-[1px] border-y-white border-x-white lg:flex justify-center items-center'>
          <div className='flex flex-col items-center'>
            <div className='w-12 h-12 sm:w-16 sm:h-16 mb-2 border border-white rounded-full overflow-hidden'>
              <Imagesprofile src={profile?.profile_image} />
            </div>
          </div>
        </div>
      )}
      <div className='w-full'>
        <Tip editor={editor} reply={reply} />
        <EditorContent editor={editor} style={{ whiteSpace: 'pre-line' }} />
      </div>
    </div>
  );
});

export default Tiptap;
