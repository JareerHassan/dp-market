import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/dummy-data";
import { Icons } from "@/components/icons";

export default function AddProductPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Provide the main details for your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="e.g., NexusBot Pro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your product in detail..." rows={5} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea id="features" placeholder="e.g., Advanced NLP Engine" rows={4} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Upload main image and gallery screenshots.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="main-image">Main Image</Label>
                <Input id="main-image" type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gallery-images">Gallery Screenshots</Label>
                <Input id="gallery-images" type="file" multiple />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="bg-card sticky top-24">
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" placeholder="e.g., chatbot, nlp, e-commerce" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <div className="relative">
                    <Icons.DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50" />
                    <Input id="price" type="number" placeholder="99.99" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-url">Demo URL (Optional)</Label>
                <Input id="demo-url" placeholder="https://demo.example.com" />
              </div>
            </CardContent>
          </Card>
           <Button type="submit" size="lg" className="w-full">
            Submit for Review
          </Button>
        </div>
      </form>
    </div>
  );
}
