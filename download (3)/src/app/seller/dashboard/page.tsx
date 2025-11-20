import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { sellerOrders, sellerProducts } from "@/lib/dummy-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const overviewData = [
    { title: "Total Revenue", value: "$45,231.89", icon: "DollarSign", description: "+20.1% from last month" },
    { title: "Total Sales", value: "+12,234", icon: "ShoppingCart", description: "+19% from last month" },
    { title: "Product Views", value: "235,000", icon: "Eye", description: "+5% from last month" },
    { title: "Available Balance", value: "$3,159.00", icon: "Wallet", description: "Ready for withdrawal" },
]

export default function SellerDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Seller Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewData.map(item => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            return (
                <Card key={item.title} className="bg-card border-2 border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        <Icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{item.value}</div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
            )
        })}
      </div>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>My Products</CardTitle>
                    <CardDescription>Manage your listed AI products.</CardDescription>
                </div>
                <Link href="/seller/add-product">
                    <Button variant="futuristic">Add Product</Button>
                </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellerProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell><Badge variant="outline" className="text-primary border-primary">Active</Badge></TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.reviewCount * 5}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>A list of recent orders for your products.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellerOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.productName}</TableCell>
                      <TableCell>{order.buyerName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">${order.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
            <Card>
                <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Your sales and revenue analytics.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-96 flex items-center justify-center text-muted-foreground">
                        Chart component coming soon...
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
