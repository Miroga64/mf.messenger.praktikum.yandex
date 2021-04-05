export default function compileTemplate(source, context){
    let template = Handlebars.compile(source);
    let html = template(context);
    return html;
}