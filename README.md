# To run Locally

To run this code locally make sure `pnpm` is installed

PNPM: `https://pnpm.io/installation`

Once done run `pnpm install && pnpm run dev`


# Desgin choices and other considerations

For this project I used Vite with the React-TS template for quick development of this single page application. I used React and Mantine components due to my familiaritiy with them so I could focus making the API calls. Mantine has many simple components that are intuative to use which let me create easiliy readable code quickly. I choose the Slider component to let the users input any percentage between 0% and 100% without letting them enter strings or values that do not work with the hsl format. I decided that the Slider would communicate the user's options and limitations so that the chance of user error decreases significantly.

When it came to lowering the amount of API calls while still getting unique colors I first found the average range of a color. To do this I looked at a range of hsl values with only the hue being changed and saw the average amount of values that held the same color name. With the user experience in mind I deicded that since the average was around 9-10 values I divided 360 hue values by 10 to create 36 colors/API calls. I then filtered through the colors to remove any repeat names. If I were to spend more time on this excierse or develop the app more my next steps would be to add a loading spinner to show the API call's progress and I would further work on making my API expand over more possible colors while making as little calls as possible.
