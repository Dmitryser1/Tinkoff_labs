export function replaceNoneImg( e: React.SyntheticEvent<HTMLImageElement, Event> ) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/img/noneImg.jpg";
}