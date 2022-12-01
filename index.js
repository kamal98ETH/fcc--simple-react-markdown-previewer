
class MarkdownPreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\nYou can even break\rusing carriage return\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"
        };
        this.updateHandler = this.updateHandler.bind(this);
    }

    updateHandler(event) {
        this.setState(
            {
                input: event.target.value
            }
        );
    }

    render() {
        let text = this.state.input
        let activeButton1 = false;
        let activeButton2 = false;
        function active1() {
            activeButton1 = !activeButton1;
            if (activeButton1) {
                document.getElementById('preview-window').classList.add('hide');
                document.getElementById('editor-minimize').classList.remove('hide');
                document.getElementById('editor-maximize').classList.add('hide');
                document.getElementById('editor-window').style.height = "95vh";
            } else {
                document.getElementById('preview-window').classList.remove('hide');
                document.getElementById('editor-minimize').classList.add('hide');
                document.getElementById('editor-maximize').classList.remove('hide');
                document.getElementById('editor-window').style.height = null;
            }
        }
        function active2() {
            activeButton2 = !activeButton2;
            if (activeButton2) {
                document.getElementById('editor-window').classList.add('hide');
                document.getElementById('preview-minimize').classList.remove('hide');
                document.getElementById('preview-maximize').classList.add('hide');
            } else {
                document.getElementById('editor-window').classList.remove('hide');
                document.getElementById('preview-minimize').classList.add('hide');
                document.getElementById('preview-maximize').classList.remove('hide');
            }
        }



        return (
            <div id="container">
                <div id="editor-window">
                    <div id="window-header">
                        <i className="fa-brands fa-free-code-camp"></i>
                        <h1>Editor</h1>
                        <button onClick={active1}>
                            <i className="fa-solid fa-maximize" id="editor-maximize"></i>
                            <i className="fa-solid fa-down-left-and-up-right-to-center hide" id="editor-minimize"></i>
                        </button>
                    </div>
                    <textarea id="editor" onChange={this.updateHandler} value={this.state.input}></textarea>
                </div>
                <div id="preview-window">
                    <div id="window-header">
                        <i className="fa-brands fa-free-code-camp"></i>
                        <h1>Previewer</h1>
                        <button onClick={active2}>
                            <i className="fa-solid fa-maximize" id="preview-maximize"></i>
                            <i className="fa-solid fa-down-left-and-up-right-to-center hide" id="preview-minimize"></i>
                        </button>
                    </div>
                    <div id="preview" dangerouslySetInnerHTML={{ __html: marked.parse(text) }}></div>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <MarkdownPreviewer />
        )
    }
}

marked.setOptions({
    gfm: true,
    breaks: true
});


ReactDOM.render(<App />, document.getElementById('root'))

