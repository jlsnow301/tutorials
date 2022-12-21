use yew::{function_component, html, Html};

#[function_component]
fn HelloWorld() -> Html {
    html! {
        <div>
            <h1>{"Hello World!"}</h1>
        </div>
    }
}
