# N Seconds to Each Point

## Meta

- **State**: production
- **Production**:
  - **URL**: https://n-seconds-to-each-point.work.damonzucconi.com/
  - **URL**: https://damonzucconi-n-seconds-to-each-point.netlify.app/
- **Host**: https://app.netlify.com/sites/damonzucconi-n-seconds-to-each-point/overview
- **Deploys**: Merged PRs to `dzucconi/n-seconds-to-each-point#master` are automatically deployed to production. [Manually trigger a deploy](https://app.netlify.com/sites/damonzucconi-n-seconds-to-each-point/deploys)

## Parameters

| Param            | Description                     | Type                                 | Default                                                                                                                          |
| ---------------- | ------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| scalar           | Size of elements                | `number`                             | 20                                                                                                                               |
| interval         | Time (in ms) between each point | `number`                             | 1000                                                                                                                             |
| color            | Color of element                | `string`                             | "gray"                                                                                                                           |
| background-color | Background color of page        | `string`                             | "black"                                                                                                                          |
| ops              | Choreography of movements       | `("ne" or "se" or "sw" or "nw")[][]` | [["nw", "sw", "se", "ne", "nw"], ["sw", "se", "ne", "nw", "sw"], ["se", "ne", "nw", "sw", "se"], ["ne", "nw", "sw", "se", "ne"]] |
