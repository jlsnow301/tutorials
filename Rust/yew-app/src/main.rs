use crate::App::CounterComponent;
use yew::prelude::*;

enum Msg {}

struct App {}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    fn create(ctx: &Context<Self>) -> Self {
        Self {}
    }

    fn view(&self, ctx: &Context<Self>) -> Html {
        html! {
            <div>
               <CounterComponent/>
            </div>
        }
    }
}

fn main() {
    yew::start_app::<App>();
}
