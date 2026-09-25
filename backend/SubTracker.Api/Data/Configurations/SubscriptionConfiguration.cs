using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SubTracker.Api.Entities;

namespace SubTracker.Api.Data.Configurations;

public class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
{
    public void Configure(EntityTypeBuilder<Subscription> builder)
    {
        builder.Property(s => s.Name).HasMaxLength(100);
        builder.Property(s => s.Price).HasPrecision(10, 2);
        builder.Property(s => s.Notes).HasMaxLength(500);
        builder.Property(s => s.BillingInterval).HasConversion<string>().HasMaxLength(20);

        builder.HasIndex(s => new { s.UserId, s.NextPaymentDate });

        builder.HasOne(s => s.Category)
            .WithMany(c => c.Subscriptions)
            .HasForeignKey(s => s.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(s => s.User)
            .WithMany()
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
