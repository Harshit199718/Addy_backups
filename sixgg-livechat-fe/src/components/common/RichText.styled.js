import styled from "styled-components" 

export const RichTextContainer = styled.div`
  flex: 1;
  .rich-text-editor {
    width: 100%;
    min-height: 150px;
    max-height: 250px;
    overflow-y: auto;
    border: 1px solid ${({theme}) => theme.primary_color};
    outline: none;
    border-radius: 10px;
    padding: 5px;
  }
  .ProseMirror {
    white-space: pre-wrap;
    word-break: break-word;
    outline: none;
  }
  
  .ProseMirror p.is-empty:before {
    content: attr(data-placeholder);
    color: #aaa;
    float: left;
    height: 0;
    pointer-events: none;
  }
`

export const HTMLSetting = styled.div`
    padding: 8px;
    font-size: 1em;
`

