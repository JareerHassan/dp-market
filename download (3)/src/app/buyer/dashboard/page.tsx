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
import { purchaseHistory, savedItems } from "@/lib/dummy-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function BuyerDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
      <Tabs defaultValue="history">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Purchase History</TabsTrigger>
          <TabsTrigger value="saved">Saved Items</TabsTrigger>
          <TabsTrigger value="settings">Profile Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>Your recent digital asset acquisitions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseHistory.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.productName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell><Badge variant="outline" className="text-primary border-primary">{order.status}</Badge></TableCell>
                      <TableCell>${order.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Download</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved">
            <Card>
                <CardHeader>
                <CardTitle>Saved Items</CardTitle>
                <CardDescription>Your curated list of interesting AI products.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedItems.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 max-w-lg">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="SynthWaveSeller" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="user@example.com" />
                </div>
                <Button variant="futuristic">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
