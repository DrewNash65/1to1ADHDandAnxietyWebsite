# How to Upload Your Blog Article

## Quick Guide for Your First Blog Upload

### **Step 1: Create Your Article HTML File**

1. **Copy the Template**: Use the sample article as a template
2. **File Location**: Save in `blog/articles/` folder
3. **File Naming**: Use lowercase with hyphens (e.g., `your-article-title.html`)

### **Step 2: Fill in the Essential Information**

Replace these sections in your HTML file:

#### **Page Title & SEO** (Lines 6-12):
```html
<title>Your Article Title | Dr. Andrew L. Nash</title>
<meta name="description" content="Your compelling 150-160 character description">
<meta name="keywords" content="your, keywords, separated, by, commas">
```

#### **Publish Date** (Line 54):
```html
<meta property="article:published_time" content="2025-01-16">
```

#### **Category** (Line 56):
Choose ONE:
- ADHD Management
- Anxiety Solutions
- Parenting Tips
- Nutrition & Lifestyle

### **Step 3: Add Your Content**

Replace the placeholder content in the article section (around line 140):

```html
<section class="article-content">
    <div class="article-container">
        <p>Your introduction paragraph goes here...</p>

        <h2>Your First Main Section</h2>
        <p>Your content here...</p>

        <!-- Add more sections as needed -->

    </div>
</section>
```

### **Step 4: Update Blog Index**

Edit the `blog.html` file:

1. **Find the JavaScript section** (around line 216)
2. **Add your article** to the `blogArticles` array:

```javascript
const blogArticles = [
    {
        title: "Your Article Title",
        excerpt: "Compelling excerpt (150 characters max)",
        category: "Your Category",
        date: "January 16, 2025",
        readTime: "X min read",
        image: "fas fa-brain", // Choose icon: fa-brain, fa-heart, fa-users, fa-apple-alt
        url: "blog/articles/your-article-filename.html",
        author: "Andrew L. Nash, MD FAAP"
    },
    // ... existing articles
];
```

### **Step 5: Test and Deploy**

1. **Save all files**
2. **Test locally**: Open your article HTML file in browser
3. **Commit changes**:
   ```bash
   git add blog/articles/your-article-filename.html
   git add blog.html
   git commit -m "Add blog article: Your Article Title"
   git push
   ```
4. **Deploy**:
   ```bash
   vercel --prod
   ```

## ✅ **Quality Checklist Before Publishing**

**Content Requirements:**
- [ ] 1000+ words for SEO
- [ ] Medical accuracy checked
- [ ] Professional tone maintained
- [ ] Practical advice included
- [ ] Call-to-action at end

**SEO Requirements:**
- [ ] Title under 70 characters
- [ ] Meta description 150-160 characters
- [ ] Keywords included naturally
- [ ] Header tags (H1, H2, H3) used properly
- [ ] Internal links to other content

**Technical Requirements:**
- [ ] HTML validates without errors
- [ ] All links work correctly
- [ ] Mobile-responsive design
- [ ] Images optimized (under 200KB)
- [ ] Alt text included for images

## 🚀 **After Publishing**

1. **Share on Social Media**
2. **Email to your list** (if set up)
3. **Check analytics** after 24 hours
4. **Monitor for comments/questions**

## 🆘 **Need Help?**

If you get stuck:
1. **Check the sample article** for reference
2. **Validate HTML** at https://validator.w3.org/
3. **Test mobile view** in browser developer tools
4. **Contact support** for technical issues

Your article will be live at: `https://adhd.1to1pediatrics.com/blog/articles/your-article-filename.html`