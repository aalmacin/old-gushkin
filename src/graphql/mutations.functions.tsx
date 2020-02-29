const CreateWishItem = `mutation CreateWishItem(
    $accessToken: String!
    $userId: String!,
    $description: String!,
    $price: Int!,
    $source: String,
    $priority: Priority!,
    $status: Status!
  ) {
    createWishItem(
      accessToken: $accessToken, 
      userId: $userId,
      description: $description,
      price: $price,
      source: $source,
      priority: $priority,
      status: $status
    ) {
      success
      error
    }
  }
`

export const createWishItem = () => {
  console.log(CreateWishItem)
}