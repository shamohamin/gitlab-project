import { RawDraftContentState } from "draft-js";

export const convertor = (content: RawDraftContentState): string => {
  const { blocks, entityMap } = content;
  let html = "";
  blocks.forEach(({ text, type, entityRanges }) => {
    if (type === "CENTER") {
      html += "<div class='center-aligment'>";
    } else if (type === "RIGHT") {
      html += "<div class='right-aligment'>";
    } else {
      html += "<div>";
    }

    if (entityRanges.length === 0) {
      html = html + typeConvertor(type, text);
    } else if (type === "atomic") {
      html += typeConvertor(type, "", {
        ...entityMap[entityRanges[0].key].data,
      });
    } else {
      let first_index = 0;
      entityRanges.forEach(({ offset, length, key }) => {
        html += typeConvertor(
          type,
          text.substr(first_index, offset - first_index)
        );
        first_index = offset + length;
        const entity = entityMap[key];
        html += typeConvertor(entity.type, text.substr(offset, length), {
          ...entity.data,
        });
      });
    }
    html += "</div>";
    html += "\n";
  });
  return html;
};

const typeConvertor = (
  type: string,
  text: string,
  option?: { url?: string; src?: string }
): string => {
  switch (type) {
    case "unstyled":
      return `<p>${text}</p>`;
    case "LINK":
      return `<a href=${
        option ? option.url : null
      } target="_blank">${text}</a>`;
    case "atomic":
      return `<img src=${option?.src} alt="cant render it" />`;
    case "H1":
      return `<h1>${text}</h1>`;
    case "H2":
      return `<h2>${text}</h2>`;
    case "CENTER":
      return `<p>${text}</p>`;
    case "RIGHT":
      return `<p>${text}</p>`
    default:
      return "";
  }
};
