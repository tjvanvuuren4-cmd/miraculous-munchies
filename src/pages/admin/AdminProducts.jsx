import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { value: "rusks", label: "Homemade Rusks" },
  { value: "biscuits", label: "Biscuits" },
  { value: "cookies", label: "Cookies" },
  { value: "cakes", label: "Cakes" },
  { value: "cupcakes", label: "Cupcakes" },
  { value: "platters", label: "Platters" },
  { value: "treat_boxes", label: "Treat Boxes" },
  { value: "specials", label: "Specials" },
];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "rusks",
    description: "",
    price: "",
    image_url: "",
    image: null,
    available: true,
  });

  const loadProducts = async () => {
    const { data } = await supabase
      .from("mm_products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      category: "rusks",
      description: "",
      price: "",
      image_url: "",
      image: null,
      available: true,
    });
  };

  const uploadImage = async () => {
    if (!form.image) return form.image_url || "";

    const fileName = `${Date.now()}-${form.image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("mm-inventory")
      .upload(fileName, form.image);

    if (uploadError) {
      console.error(uploadError);
      return form.image_url || "";
    }

    const { data } = supabase.storage
      .from("mm-inventory")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    const productData = {
      name: form.name,
      category: form.category,
      description: form.description,
      price: Number(form.price),
      image_url: imageUrl,
      available: form.available,
    };

    if (editingId) {
      await supabase
        .from("mm_products")
        .update(productData)
        .eq("id", editingId);
    } else {
      await supabase.from("mm_products").insert([productData]);
    }

    resetForm();
    loadProducts();
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      category: product.category || "rusks",
      description: product.description || "",
      price: product.price || "",
      image_url: product.image_url || "",
      image: null,
      available: product.available ?? true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    await supabase.from("mm_products").delete().eq("id", id);

    loadProducts();
  };

  const toggleAvailable = async (product) => {
    await supabase
      .from("mm_products")
      .update({ available: !product.available })
      .eq("id", product.id);

    loadProducts();
  };

  return (
    <div className="min-h-screen p-8" style={{ background: "#160617" }}>
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl font-black mb-10"
          style={{
            background: "linear-gradient(135deg,#f7d774,#f7c948,#ffefad)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Products
        </h1>

        <form
          onSubmit={saveProduct}
          className="rounded-[2rem] p-6 mb-8 grid gap-4"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,215,90,0.14)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="h-10 rounded-md px-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,215,90,0.14)",
              color: "white",
            }}
          >
            {categories.map((cat) => (
              <option
                key={cat.value}
                value={cat.value}
                style={{ color: "black" }}
              >
                {cat.label}
              </option>
            ))}
          </select>

          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <div className="space-y-2">
            <label className="text-white text-sm">Product Image</label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files[0],
                })
              }
            />

            {form.image_url && (
              <img
                src={form.image_url}
                alt="Current product"
                className="w-32 h-24 object-cover rounded-xl mt-2"
              />
            )}
          </div>

          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) =>
                setForm({ ...form, available: e.target.checked })
              }
            />
            Product available
          </label>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="rounded-full h-14 border-0 font-bold px-8"
              style={{
                background:
                  "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
                color: "#1a1203",
              }}
            >
              {editingId ? "Update Product" : "Add Product"}
            </Button>

            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
          </div>
        </form>

        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-[1.5rem] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,215,90,0.14)",
              }}
            >
              <div className="flex items-center gap-4">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-20 h-16 object-cover rounded-xl"
                  />
                )}

                <div>
                  <h3 className="text-white font-bold">{product.name}</h3>
                  <p className="text-white/60 text-sm">{product.category}</p>
                  <p className="text-yellow-300 font-bold mt-1">
                    R{product.price}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      product.available ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {product.available ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={() => editProduct(product)}>
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => toggleAvailable(product)}
                >
                  {product.available ? "Hide" : "Show"}
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}